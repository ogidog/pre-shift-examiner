import {Request, Response} from "express";
import {TestingService} from "../services/testing-service";
import {IResponseObject, IAnswers, IUser} from "pre-shift-examiner-types";

export async function getQuestions(req: Request, res: Response) {
    let settingId: IUser["settingId"] = Number(req.query["setting-id"]);
    const responseObject: IResponseObject = await TestingService.getQuestions(settingId);

    res.status(responseObject.httpStatusCode).send(responseObject);
}

export async function checkAnswers(req: Request, res: Response) {
    const params = req.body;

    const userId = params["user-id"] as IUser["id"];
    const settingId = params["setting-id"] as IUser["settingId"];
    const answers = params["answers"] as IAnswers;

    const responseObject = await TestingService.checkAnswers(userId, settingId, answers);
    res.status(responseObject.httpStatusCode).send(responseObject);

}


