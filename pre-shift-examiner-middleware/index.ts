import express, {Express} from "express";
import {initConfig} from "./shared/config"

initConfig();

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_HOST);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
});

import testingRouter from "./routes/testing-router";
import loginRouter from "./routes/login-router"

app.use("/api/testing", testingRouter);
app.use("/api/auth", loginRouter);

app.listen(port, () => {
    console.log(`Server is ran on ${port} port.`)
})


