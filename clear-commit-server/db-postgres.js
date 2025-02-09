import pg from 'pg';
import 'dotenv/config';
import bcrypt from "bcryptjs";

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
});

const createPasswordHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync());


export const query = (text, params) => pool.query(text, params);

export const initDb = async () => {
    try {
        await query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            login VARCHAR(255) UNIQUE NOT NULL,
            role VARCHAR(50) NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL
          );
        `);
        const { rows } = await query('SELECT * FROM users WHERE login = $1', ['admin']);

        const passwordHash = createPasswordHash('123456');

        if (rows.length === 0) {
            await query(
                `INSERT INTO users (login, role, name, email, password_hash) 
         VALUES ($1, $2, $3, $4, $5)`,
                ['admin', 'admin', 'Admin', 'admin@example.com', passwordHash]
            );
            console.log('Admin user created successfully');
        }

        console.log('Database initialized successfully');
        return true;
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
};
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('PostgreSQL pool error:', err);
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connection test successful');
        client.release();
    } catch (err) {
        console.error('Database connection test failed:', err);
        process.exit(1); // Stop the application if the database connection test fails
    }
};

testConnection();