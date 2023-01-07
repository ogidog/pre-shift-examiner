import {Request, Response} from "express";
import TestingService from "../services/testing-service"

export async function getQuestions(req: Request, res: Response) {
    const {personnel_id} = req.query as { [key: string]: string };
    const responseObject = await TestingService.getQuestions(personnel_id);

    res.status(responseObject.httpStatusCode).send({
        questions: responseObject.questions,
        user: responseObject.user,
        settings: responseObject.settings
    });
}


