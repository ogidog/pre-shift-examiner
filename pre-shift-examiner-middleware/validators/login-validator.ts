import {IResponseObject,} from "pre-shift-examiner-types";
import {ErrorMessages} from "../shared/constants";
import validator from "validator";
import {Request, Response, NextFunction} from "express";
import {verifyToken} from "../services/jwt-service";
import {IAccessTokenPayload} from "pre-shift-examiner-types"

export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {

    let responseObject: IResponseObject = {httpStatusCode: 401, error: {message: ErrorMessages.AUTH_ERROR}};

    try {

        const personnelId = req.query["personnel-id"] as any;
        const isValid = !validator.isEmpty(personnelId) && validator.isLength(personnelId, {min: 5, max: 16});
        if (!isValid) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        const accessToken = req.cookies["_at"];
        if (!accessToken) {
            next();
            return;
        }

        const accessTokenPayload: IAccessTokenPayload = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        if (!accessTokenPayload) {
            responseObject = {...responseObject, httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}}
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        if(!accessTokenPayload.loginAttempts){
            responseObject = {...responseObject, httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}}
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        if (accessTokenPayload.loginAttempts > +process.env.MAX_LOGIN_ATTEMPTS!) {
            res.status(responseObject.httpStatusCode).send({
                ...responseObject,
                error: {message: ErrorMessages.ATTEMPTS_EXCEEDED_ERROR}
            });
            return;
        }

        next();

    } catch (e) {
        responseObject = {...responseObject, httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}}
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}

