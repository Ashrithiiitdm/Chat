import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';

import cors from 'cors';
import cookieParser from 'cookie-parser';

import bodyParser from 'body-parser';
import routes from './routes/index.js';


// Create a new express application
const app = express();

//Using middlewares.
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

//Setting limit for no of requests for protection.
const limitter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour',
})

app.use('/api', limitter);
app.use(express.urlencoded({
    extended: true
}));
app.use(xss());

app.use(routes)

//Export the express-application.
export default app;