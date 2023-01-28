import {Request, Response} from "express";
import TestingService from "../services/testing-service";

export async function getQuestions(req: Request, res: Response) {
    const {setting_id} = req.query as { [key: string]: string };
    const responseObject = await TestingService.getQuestions(setting_id);

    res.status(responseObject.httpStatusCode).send(responseObject);
}


