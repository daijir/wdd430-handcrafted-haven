import { Pool } from 'pg';
import postgres from 'postgres';

let pool: Pool;

if (!process.env.POSTGRES_URL) {
    throw new Error('Please define the POSTGRES_URL environment variable inside .env.local');
}

export const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

// Render uses self-signed certificates for internal connections or expected CA for external.
// Usually { rejectUnauthorized: false } avoids "self signed certificate" errors for external connections unless CA is provided.
const sslConfig = {
    rejectUnauthorized: false,
};

if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
        ssl: sslConfig,
    });
} else {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithPool = global as typeof globalThis & {
        pool: Pool;
    };

    if (!globalWithPool.pool) {
        globalWithPool.pool = new Pool({
            connectionString: process.env.POSTGRES_URL,
            ssl: sslConfig,
        });
    }
    pool = globalWithPool.pool;
}

export default pool;
