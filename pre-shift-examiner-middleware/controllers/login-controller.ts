import {Request, Response} from "express";
import LoginService from "../services/login-service";

export async function login(req: Request, res: Response) {

    let responseObject = LoginService.login("");

}
