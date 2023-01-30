import {Request, Response} from "express";
import TestingService from "../services/testing-service";
import {IResponseObject, IAnswers, IUser} from "pre-shift-examiner-types";

export async function getQuestions(req: Request, res: Response) {
    const settingId = req.query["setting-id"] as unknown as IUser["settingId"];
    const responseObject: IResponseObject = await TestingService.getQuestions(settingId);

    res.status(responseObject.httpStatusCode).send(responseObject);
}

export async function saveAnswers(req: Request, res: Response) {
    const params = req.body;

    const userId = params["user-id"] as IUser["id"];
    const answers = params["answers"] as IAnswers;

    const responseObject = await TestingService.saveAnswers(userId, answers);
    res.status(responseObject.httpStatusCode).send(responseObject);

}


