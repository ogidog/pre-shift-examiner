import express, {Express} from "express";
import {config} from "./shared/config"
import cookieParser from "cookie-parser";
import cors from "cors";
import {generateToken} from "./shared/services/jwt-service";
import {IAccessTokenPayload} from "pre-shift-examiner-types";

config();

import testingRouter from "./routes/testing-router";
import loginRouter from "./routes/login-router"

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

app.use((req, res, next) => {
    try {
        const _at = req.cookies["_at"];
        if (!_at) {
            const payload: IAccessTokenPayload = {requestTime: Date.now()}
            const token = generateToken(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!}
            );
            res.cookie('_at', token, {
                "secure": process.env.NODE_ENV === "production",
                "maxAge": parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE!),
                "sameSite": "strict",
                "httpOnly": true
            });
            res.status(200).end();
            return;
        }
        next();

    } catch (e) {
        res.status(500).end();
    }
});

app.use("/api/testing", testingRouter);
app.use("/api/auth", loginRouter);

app.listen(port, () => {
    console.log(`Server is ran on ${port} port.`)
})


