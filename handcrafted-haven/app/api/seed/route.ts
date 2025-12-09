import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSellers, getProducts } from '@/lib/data';

export async function GET() {
    try {
        const client = await pool.connect();
        try {
            // Start transaction
            await client.query('BEGIN');

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

            // Insert Sellers
            const sellers = await getSellers();
            for (const seller of sellers) {
                await client.query(`
          INSERT INTO sellers (id, name, email, bio, profile_image_url)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (id) DO NOTHING;
        `, [seller.id, seller.name, seller.email, seller.bio, seller.profileImageUrl]);
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
