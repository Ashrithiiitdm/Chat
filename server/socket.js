import { Server } from "socket.io";
import authSocket from "./middleware/authSocket.js";
import { newConnection } from "./socketHandlers/newConnection.js";
import { disconnectHandler } from "./socketHandlers/disconnection.js";
import { getMessages } from "./socketHandlers/getMessage.js";
import { newMessage } from "./socketHandlers/newMessage.js";

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
        //console.log("New connection");
        console.log(socket.user);

        const user_id = socket.handshake.query['user_id'];
        const socket_id = socket.id;

        console.log(`New connection: ${socket_id}, user_id: ${user_id}`);


        if(user_id){
            
        }

        //I should handle new connections.

        socket.on("newConnection", () => {
            newConnection(socket, io);
        });
        //I should Handle new messages

        socket.on("newMessage", (message) => {
            newMessage(socket, message, io);
        });

        //I should Handle disconnections

        socket.on("disconnect", () => {
            disconnectHandler(socket);
        });


        //I should handle chat history
        socket.on("chatHistory", (data) => {
            getMessages(socket, data);

        });
        //

    });


};

export default regSocket;