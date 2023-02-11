import {Request, Response} from "express";
import {LoginService} from "../services/login-service";
import {IResponseObject, IUser} from "pre-shift-examiner-types"

export async function login(req: Request, res: Response) {

    let personnelId: IUser["personnelId"] = req.query["personnel-id"] as unknown as IUser["personnelId"];
    let responseObject:IResponseObject = await LoginService.login(personnelId);

    res.status(responseObject.httpStatusCode).send(responseObject);
}
