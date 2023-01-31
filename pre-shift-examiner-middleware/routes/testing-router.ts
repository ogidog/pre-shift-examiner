import express from "express";
import {getQuestions, checkAnswers} from "../controllers/testing-controller";

const router = express.Router();

router.get("/questions", getQuestions);
router.post("/check-answers", checkAnswers);

export default router;
