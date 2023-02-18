import express from "express";
import {setAccessTokenCookie} from "../controllers/cookies-controller";

const router = express.Router()

router.get("/access-token", setAccessTokenCookie);

export default router;
