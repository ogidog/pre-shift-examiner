import express, {Express} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import slowDown from "express-slow-down";

dotenv.config();
dotenv.config({path: `${process.cwd()}/.env.${process.env.NODE_ENV}.local`});

import testingRouter from "./routes/testing-router";
import loginRouter from "./routes/login-router";


const speedLimiter = slowDown({
    windowMs: 3 * 60 * 1000, // 15 minutes
    delayAfter: 15, // allow 100 requests per 15 minutes, then...
    delayMs: 500, // begin adding 500ms of delay per request above 100:
    maxDelayMs: 15000,
    skipSuccessfulRequests: true,
});

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_HOST,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
}));
app.enable("trust proxy");

app.use(speedLimiter);
app.use("/api/testing", testingRouter);
app.use("/api/auth", loginRouter);

app.listen(port, () => {
    console.log(`Server is ran on ${port} port.`)
})


