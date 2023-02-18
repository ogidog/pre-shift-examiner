import {IResponseObject} from "pre-shift-examiner-types";
import {Request, Response} from "express";
import AccessTokenCookie from "../services/cookies-service";

export function setAccessTokenCookie(req: Request, res: Response) {
    let responseObject: IResponseObject = {httpStatusCode: 500};
    responseObject = AccessTokenCookie.create(res, responseObject);

    res.send(responseObject.httpStatusCode).end();
}
