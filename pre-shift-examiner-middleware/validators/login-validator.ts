import {IResponseObject, ErrorMessages} from "pre-shift-examiner-types";
import validator from "validator";
import {Request, Response, NextFunction} from "express";

export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {

    let responseObject: IResponseObject = {httpStatusCode: 401, error: {message: ErrorMessages.AUTH_ERROR}};

    try {
        const personnelId = req.query["personnel-id"] as any;
        const isValid = !validator.isEmpty(personnelId) && validator.isLength(personnelId, {min: 5, max: 16});
        if (!isValid) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        next();

    } catch (e) {
        responseObject = {...responseObject, httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}}
        res.status(responseObject.httpStatusCode).send(responseObject);
        return;
    }
}

