import express, {Express} from "express";
import dotenv from "dotenv";

const app: Express = express();
const port = process.env.PORT || '3001';

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

import testingRouter from "./routes/testing-router";

app.use("/api/testing", testingRouter);

app.listen(port, () => {
    console.log("Server is running.")
})


