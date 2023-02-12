import express from "express";
import {cookie} from "express-validator";
import {login} from "../controllers/login-controller";
import {tokenValidator} from "../validators/login-validator";

const router = express.Router();

router.get("/login", cookie().custom(tokenValidator), login);

export default router;
