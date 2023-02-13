import {Request, Response} from "express";
import {LoginService} from "../services/login-service";
import {IResponseObject, IUser} from "pre-shift-examiner-types";

export async function login(req: Request, res: Response) {
    let responseObject: IResponseObject = {httpStatusCode: 500};

    let personnelId: IUser["personnelId"] = req.query["personnel-id"] as IUser["personnelId"];
    responseObject = await LoginService.login(personnelId, responseObject);

    res.status(responseObject.httpStatusCode).send(responseObject);
}
