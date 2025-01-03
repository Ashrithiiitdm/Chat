import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log(socket.handshake);
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decodedToken;
    }
    catch (err) {
        next(new Error("Not authorized"));
    }
    next();
}

export default verifyToken;