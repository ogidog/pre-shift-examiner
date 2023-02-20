import {IResponseObject, ErrorMessages} from "pre-shift-examiner-types";
import {verifyToken} from "../services/jwt-service";
import {IAccessTokenPayload} from "pre-shift-examiner-types";
import {Request, Response, NextFunction} from "express";
import AccessTokenCookie from "../services/cookies-service";

export const accessTokenValidator = async (req: Request, res: Response, next: NextFunction) => {

    let responseObject: IResponseObject = {httpStatusCode: 401, error: {message: ErrorMessages.AUTH_ERROR}};

    try {
        const accessTokenCookie = req.cookies["_at"];

        if (!accessTokenCookie) {
            AccessTokenCookie.create(res);
            next();
            return;
        }

        const payload: IAccessTokenPayload = (await verifyToken(accessTokenCookie, process.env.ACCESS_TOKEN_SECRET!)) as IAccessTokenPayload;
        if (!payload) {
            res.status(responseObject.httpStatusCode).send(responseObject);
            return;
        }

        if (+payload.loginAttempts > +process.env.MAX_LOGIN_ATTEMPTS!) {
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
        return;
    }
}

