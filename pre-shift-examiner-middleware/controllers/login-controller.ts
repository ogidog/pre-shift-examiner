import {Request, Response} from "express";
import {LoginService} from "../services/login-service";
import {IResponseObject, IUser} from "pre-shift-examiner-types";
import {ErrorMessages} from "../shared/constants";

export async function login(req: Request, res: Response) {

    try {
        let personnelId: IUser["personnelId"] = req.query["personnel-id"] as IUser["personnelId"];
        const responseObject = await LoginService.login(personnelId, req.cookies["_at"]);

        let accessToken = responseObject.accessToken
        if(accessToken) {
            res.cookie("_at", accessToken.cookieValue, accessToken.cookieOptions);
            delete responseObject.accessToken;
        }

        res.status(responseObject.httpStatusCode).send(responseObject);

    } catch (e) {
        const responseObject: IResponseObject = {httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}};
        res.status(responseObject.httpStatusCode).send(responseObject);
    }
}
