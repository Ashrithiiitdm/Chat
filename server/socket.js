import { Server } from "socket.io";
import { createServer } from "http";
import app from "./app.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"

    }
});


export function getReceiverSocketId(user_id) {
    return userSocketMap[user_id];
}

const userSocketMap = {};


io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    const user_id = socket.handshake.query.user_id;

    if (user_id) {
        userSocketMap[user_id] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        delete userSocketMap[user_id];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

});

export { io, httpServer };