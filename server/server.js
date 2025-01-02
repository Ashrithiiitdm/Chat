import { httpServer, io } from './socket.js';
import dotenv from 'dotenv';
import pg from 'pg';


dotenv.config();

const PORT = process.env.PORT || 3000;


// regSocket(server);

const pool = new pg.Pool({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default pool;



httpServer.listen(PORT, () => {
    console.log('Inside server listen');
    console.log(`Server is running on port ${PORT}`);
});



