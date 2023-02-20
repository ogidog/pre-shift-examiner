import {Request, Response} from "express";
import {LoginService} from "../services/login-service";
import {IResponseObject, IUser} from "pre-shift-examiner-types";
import AccessTokenCookie from "../services/cookies-service";

export async function login(req: Request, res: Response) {
    let responseObject: IResponseObject = {httpStatusCode: 500};

    let personnelId: IUser["personnelId"] = req.query["personnel-id"] as IUser["personnelId"];
    responseObject = await LoginService.login(personnelId, responseObject);

    if (responseObject.error && req.cookies["_at"]) {
        await AccessTokenCookie.update(res, req.cookies["_at"]);
    }

    res.status(responseObject.httpStatusCode).send(responseObject);
}
