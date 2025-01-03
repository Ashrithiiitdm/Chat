import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8000',
    },
});

export function getReceiverSocketId(user_id) {
    return userSocketMap[user_id];
};

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    const user_id = socket.handshake.query.user_id;

    if (user_id) {
        userSocketMap[user_id] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
        delete userSocketMap[user_id];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

});


export { server, app };

