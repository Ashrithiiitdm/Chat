import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';


const PORT = process.env.PORT || 8000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });

});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});