import {Request, Response} from "express";
import {TestingService} from "../services/testing-service";
import {IResponseObject, IAnswers} from "pre-shift-examiner-types";
import {ErrorMessages} from "../shared/constants";

export async function getQuestions(req: Request, res: Response) {

    try {
        const responseObject: IResponseObject = await TestingService.getQuestions({cookieValue: req.cookies["_at"]});
        res.status(responseObject.httpStatusCode).send(responseObject);

    } catch (e) {
        const responseObject: IResponseObject = {httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}};
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}

export async function checkAnswers(req: Request, res: Response) {

    try {
        const params = req.body;
        const answers = params["answers"] as IAnswers;
        const responseObject: IResponseObject = await TestingService.checkAnswers(answers, {cookieValue: req.cookies["_at"]},);

        let accessTokenCookie = responseObject.accessTokenCookie
        if (accessTokenCookie) {
            res.clearCookie("_at");
            delete responseObject.accessTokenCookie;
        }

        res.status(responseObject.httpStatusCode).send(responseObject);

    } catch (e) {
        const responseObject: IResponseObject = {httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}};
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}


