import bcrypt from 'bcrypt';
import postgres from 'postgres';
import {  sellers, users } from '../lib/data';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}


async function seedSllers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedSellers = await Promise.all(
    sellers.map(
      (seller) => sql`
        INSERT INTO seller (id, name, email, image_url)
        VALUES (${seller.id}, ${seller.name}, ${seller.email}, ${seller.profileImageUrl})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSellers;
}



  

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedSllers()
      
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
