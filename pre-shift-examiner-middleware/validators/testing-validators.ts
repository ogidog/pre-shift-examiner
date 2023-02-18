import {IAnswers, IQuestion, IResponseObject, ErrorMessages} from "pre-shift-examiner-types";
import {NextFunction, Request, Response} from "express";
import validator from "validator";

export const getQuestionsValidator = (req: Request, res: Response, next: NextFunction) => {

    let responseObject: IResponseObject = {httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}};

    try {
        let settingId = String(req.query["setting-id"]);
        const isValid = validator.isNumeric(settingId);
        if (!isValid) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        next();

    } catch (e) {
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}

export const checkAnswersValidator = (req: Request, res: Response, next: NextFunction) => {
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
        const params = req.body;
        const userId = params["user-id"] as string;
        const settingId = params["setting-id"] as string;
        const answers = params["answers"] as IAnswers;

        const isValid = validator.isNumeric(String(userId))
            && validator.isNumeric(String(settingId))
            && validateAnswersArray(answers);

        if (!isValid) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        next();

    } catch (e) {
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}
