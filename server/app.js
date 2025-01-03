import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { app, server } from "./socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

