import app from './app.js';
import http from 'http';
import regSocket from './socket.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
regSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});