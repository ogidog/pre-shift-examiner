import express from "express";
import {getQuestions} from "../controllers/testing-controller";

const router = express.Router();

router.get("/questions", getQuestions);

export default router;
