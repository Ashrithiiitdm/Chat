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
    });

    setInterval(() => {
        //I should emit online users here.

    }, [1000 * 8]);
};

export default regSocket;