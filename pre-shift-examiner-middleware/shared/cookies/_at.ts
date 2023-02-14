import {generateToken} from "../services/jwt-service";
import {IAccessTokenPayload} from "pre-shift-examiner-types";
import {Response} from "express";

export class AccessTokenCookie {

    static create(res: Response) {
        const payload: IAccessTokenPayload = {requestTime: Date.now()}
        const token = generateToken(
            payload,
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!}
        );

        res.cookie("_at", token, {
            "secure": process.env.NODE_ENV === "production",
            "maxAge": parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE!),
            "sameSite": "strict",
            "domain": "onrender.com",
            "httpOnly": true
        });
    }
}

export default AccessTokenCookie;

