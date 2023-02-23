import express from "express";
import {getQuestions, checkAnswers} from "../controllers/testing-controller";
import {getQuestionsValidator, checkAnswersValidator} from "../validators/testing-validators";


const router = express.Router();

router.get("/questions", getQuestionsValidator, getQuestions);
router.post("/check-answers", checkAnswersValidator, checkAnswers);

export default router;
