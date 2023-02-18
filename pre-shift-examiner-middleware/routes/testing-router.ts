import express from "express";
import {getQuestions, checkAnswers} from "../controllers/testing-controller";
import {accessTokenValidator} from "../validators/token-validator";
import {getQuestionsValidator, checkAnswersValidator} from "../validators/testing-validators";


const router = express.Router();

router.get("/questions", accessTokenValidator, getQuestionsValidator, getQuestions);
router.post("/check-answers", accessTokenValidator, checkAnswersValidator, checkAnswers);

export default router;
