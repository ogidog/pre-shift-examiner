import express, {Express} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({path: `${process.cwd()}/.env.${process.env.NODE_ENV}.local`});

import testingRouter from "./routes/testing-router";
import loginRouter from "./routes/login-router";
import cookiesRouter from "./routes/cookies-router";

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

app.use("/api/cookies", cookiesRouter);
app.use("/api/testing", testingRouter);
app.use("/api/auth", loginRouter);

app.listen(port, () => {
    console.log(`Server is ran on ${port} port.`)
})


