import app from './app.js';
import http from 'http';
import regSocket from './socket.js';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
regSocket(server);

const pool = new pg.Pool({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default pool;

(async () => {
    try {
        await pool.connect();
        console.log('PostgreSQL connection successful');

        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    }

    catch (err) {
        console.log('Database connection failed. Server not started.');
        console.log(err);
    }
})();