import {IAnswers, IResponseObject, IAccessTokenPayload} from "pre-shift-examiner-types";
import {ErrorMessages} from "../shared/constants";
import {NextFunction, Request, Response} from "express";
import validator from "validator";
import {verifyToken} from "../services/jwt-service"

export const getQuestionsValidator = async (req: Request, res: Response, next: NextFunction) => {

    let responseObject: IResponseObject = {httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}};

    try {

        const accessToken = req.cookies["_at"];
        if (!accessToken) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        const accessTokenPayload: IAccessTokenPayload = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!);

        if (!accessTokenPayload) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        if (accessTokenPayload.id && !accessTokenPayload.isGotQuestions) {
            next();
            return;
        }

        res.status(responseObject.httpStatusCode).send(responseObject);
        return;

    } catch (e) {
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}

export const checkAnswersValidator = async (req: Request, res: Response, next: NextFunction) => {
    let responseObject: IResponseObject = {httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}};

    const validateAnswersArray = (answers: any): boolean => {
        for (const questionId in answers) {
            if (!validator.isNumeric(String(questionId))) return false;

            for (const optionId of answers[questionId]) {
                if (!validator.isNumeric(String(optionId))) return false;
            }
        }
        return true;
    }

    try {

        const accessToken = req.cookies["_at"];
        if (!accessToken) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        const accessTokenPayload: IAccessTokenPayload = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        if (!accessTokenPayload) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        const params = req.body;
        const answers = params["answers"] as IAnswers;

        const isValid = validateAnswersArray(answers);
        if (!isValid) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        if (accessTokenPayload.id) {
            next();
            return;
        }

        res.status(responseObject.httpStatusCode).send(responseObject);
        return;

    } catch (e) {
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}
