import {Request, Response} from "express";
import LoginService from "../services/login-service";

export async function login(req: Request, res: Response) {

    let personnelId: string = req.query.personnel_id as string;
    let responseObject = await LoginService.login(personnelId);

    res.status(responseObject.httpStatusCode).send(responseObject);

}
