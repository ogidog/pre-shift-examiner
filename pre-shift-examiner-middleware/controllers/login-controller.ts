import {Request, Response} from "express";
import {LoginService} from "../services/login-service";
import {IResponseObject, IUser, IAccessTokenPayload, ErrorMessages} from "pre-shift-examiner-types";
import {validationResult} from "express-validator";
import {generateToken} from "../shared/services/jwt-service";

export async function login(req: Request, res: Response) {
    let responseObject: IResponseObject = {httpStatusCode: 500};
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
        const payload: IAccessTokenPayload = {requestTime: Date.now()}
        const token = generateToken(
            payload,
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!}
        );
        res.cookie('_at', token, {
            "secure": process.env.NODE_ENV === "production",
            "maxAge": parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE!),
            "sameSite": "strict",
            "httpOnly": true
        });

        responseObject = {...responseObject, httpStatusCode: 401, error: {message: ErrorMessages.AUTH_ERROR}}

    } else {
        let personnelId: IUser["personnelId"] = req.query["personnel-id"] as unknown as IUser["personnelId"];
        responseObject = await LoginService.login(personnelId, responseObject);
    }

    res.status(responseObject.httpStatusCode).send(responseObject);
}
