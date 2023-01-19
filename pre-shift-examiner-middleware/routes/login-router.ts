import express from "express";
import {login} from "../controllers/login-controller";

const router = express.Router();

router.get("/login", login);

export default router;
