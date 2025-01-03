import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { initializeSocket } from './socket.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const httpServer = createServer(app);
const io = initializeSocket(httpServer);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 