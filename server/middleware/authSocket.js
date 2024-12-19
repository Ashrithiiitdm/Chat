import jwt from 'jsonwebtoken';

const verifyToken = (socket, next) => {
    const token = socket.handshake.auth.token;

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