import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER, // <-- Corregido
    password: process.env.DB_PASSWORD, // <-- Corregido
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT), // Convertir a número por seguridad
});
const connectToDb = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database.');
    }
    catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
};
export { pool, connectToDb };
