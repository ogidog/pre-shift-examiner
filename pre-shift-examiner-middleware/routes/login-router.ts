import express from "express";
import {login} from "../controllers/login-controller";
import {loginValidator} from "../validators/login-validator";
import  {accessTokenValidator} from "../validators/token-validator"

const router = express.Router();

router.get("/login", accessTokenValidator, loginValidator, login);

export default router;
