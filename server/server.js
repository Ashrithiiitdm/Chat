import app from './app.js';
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;