import { Server } from "socket.io";
import authSocket from "./middleware/authSocket.js";

const regSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    io.on("connection", (socket) => {
        console.log("New connection");
        console.log(socket.user);

        //I should handle new connections.

        socket.on("newConnection", () => {
            console.log("New connection");
        });
        //I should Handle new messages

        socket.on("newMessage", (message) => {
            console.log(message);
        });

        //I should Handle disconnections

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });


        //I should handle chat history
        socket.on("chatHistory", () => {
            console.log("Chat history requested");

        });
        //

    });


};

export default regSocket;