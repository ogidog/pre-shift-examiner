import express, {Express} from "express";

import testingRouter from "./routes/testing-router";

const app: Express = express();
const port = process.env.PORT || '3001';

app.use("/api/testing", testingRouter);

app.listen(port, ()=>{
    console.log("Server is running.")
})


