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

        res.cookie("at", "test", {
            "secure": false, // process.env.NODE_ENV === "production",
            "maxAge": 100000000, // parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE!),
            "domain": "172.16.1.117", //"pre-shift-examiner.onrender.com",
            // "httpOnly": true,
            "sameSite": "none"
        });
    }
}

export default AccessTokenCookie;

