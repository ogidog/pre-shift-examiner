import express, {Express} from "express";
import {config} from "./shared/config"
import cookieParser from "cookie-parser";
import cors from "cors";
import AccessTokenCookie from "./shared/cookies/_at";

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

app.use("/cookies", (req, res) => {
    try {
        const _at = req.cookies["_at"];
        if (!_at) {
            res.cookie("at", "test1", {
                "secure": process.env.NODE_ENV === "production",
                "maxAge": 100000000, // parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE!),
                "domain": "pre-shift-examiner-api.onrender.com",
                "httpOnly": true,
                "sameSite": "none",

            });
            // AccessTokenCookie.create(res);
        }
        res.status(200).end();

    } catch (e) {
        res.status(500).end();
    }
});

app.use("/api/testing", testingRouter);
app.use("/api/auth", loginRouter);

app.listen(port, () => {
    console.log(`Server is ran on ${port} port.`)
})


