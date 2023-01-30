import express from "express";
import {getQuestions, saveAnswers} from "../controllers/testing-controller";

const router = express.Router();

router.get("/questions", getQuestions);
router.post("/save-answers", saveAnswers);

export default router;
