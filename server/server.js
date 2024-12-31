import app from './app.js';
import http from 'http';
import regSocket from './socket.js';
import dotenv from 'dotenv';
import pg from 'pg';
import { Server } from 'socket.io';
import { getAllUsers } from './controllers/users.js';
import { getFriends } from './controllers/friends.js';
import { getFriendRequests, addFriendRequest } from './controllers/friends.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
// regSocket(server);

const pool = new pg.Pool({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default pool;

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});


io.on("connection", (socket) => {
    console.log("New connection");
    const user_id = socket.handshake.query['user_id'];
    const socket_id = socket.id;

    console.log(`New connection: ${socket_id}, user_id: ${user_id}`);

    socket.on("friend_request", async (data) => {
        
        addFriendRequest()

        socket.on("new-friend_request", )

    });



});


server.listen(PORT, () => {
    console.log('Inside server listen');
    console.log(`Server is running on port ${PORT}`);
});



