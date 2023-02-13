import express from "express";
import {login} from "../controllers/login-controller";
import {loginValidator} from "../validators/login-validator";

const router = express.Router();

router.get("/login", loginValidator, login);

export default router;
