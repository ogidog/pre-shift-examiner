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

        res.cookie("at", token, {
            "secure": process.env.NODE_ENV === "production",
            "maxAge": parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE!),
            "domain": "pre-shift-examiner-api.onrender.com",
            "httpOnly": true,
            "sameSite": "none",
        });
    }
}

export default AccessTokenCookie;

