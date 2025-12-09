import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSellers, getProducts } from '@/lib/data';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const SALT_ROUNDS = 10;
const DEFAULT_PASSWORD = 'password123';

export async function GET() {
    try {
        const client = await pool.connect();
        try {
            // Start transaction
            await client.query('BEGIN');

            // Drop existing tables to ensure schema consistency (re-defining IDs as VARCHAR)
            await client.query(`DROP TABLE IF EXISTS products, sellers, users CASCADE;`);

            // Create Users Table
            await client.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL
                );
            `);

            // Create Sellers Table
            await client.query(`
                CREATE TABLE IF NOT EXISTS sellers (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    bio TEXT,
                    profile_image_url TEXT
                );
            `);

            // Create Products Table
            await client.query(`
                CREATE TABLE IF NOT EXISTS products (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    price DECIMAL(10, 2) NOT NULL,
                    category VARCHAR(255),
                    seller_id VARCHAR(255) REFERENCES sellers(id),
                    image_url TEXT
                );
            `);

            const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);

            // Insert Sellers from data.ts
            const sellers = await getSellers();
            for (const seller of sellers) {
                // Insert into users table
                await client.query(`
                    INSERT INTO users (id, name, email, password, role)
                    VALUES ($1, $2, $3, $4, 'seller')
                    ON CONFLICT (email) DO NOTHING;
                `, [seller.id, seller.name, seller.email, hashedPassword]);

                // Insert into sellers table
                await client.query(`
                    INSERT INTO sellers (id, name, email, bio, profile_image_url)
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (id) DO NOTHING;
                `, [seller.id, seller.name, seller.email, seller.bio, seller.profileImageUrl]);
            }

            // Insert random Buyers
            const buyers = [
                { name: 'Buyer One', email: 'buyer1@example.com' },
                { name: 'Buyer Two', email: 'buyer2@example.com' },
                { name: 'Buyer Three', email: 'buyer3@example.com' },
            ];

            for (const buyer of buyers) {
                const buyerId = randomUUID();
                await client.query(`
                    INSERT INTO users (id, name, email, password, role)
                    VALUES ($1, $2, $3, $4, 'buyer')
                    ON CONFLICT (email) DO NOTHING;
                `, [buyerId, buyer.name, buyer.email, hashedPassword]);
            }

            // Insert Products
            const products = await getProducts();
            for (const product of products) {
                await client.query(`
                    INSERT INTO products (id, name, description, price, category, seller_id, image_url)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    ON CONFLICT (id) DO NOTHING;
                `, [
                    product.id,
                    product.name,
                    product.description,
                    product.price,
                    product.category,
                    product.sellerId,
                    product.imageUrl
                ]);
            }

            await client.query('COMMIT');
            return NextResponse.json({ success: true, message: 'Database seeded successfully' });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
