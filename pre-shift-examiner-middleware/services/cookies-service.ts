import {generateToken, verifyToken} from "./jwt-service";
import {IAccessTokenPayload,} from "pre-shift-examiner-types";
import {Response} from "express";

export class AccessTokenCookie {

    static create(res: Response) {

        try {

            const payload: IAccessTokenPayload = {loginAttempts: 1}
            const token = generateToken(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!}
            );

            res.cookie("_at", token, {
                "secure": process.env.NODE_ENV === "production",
                "maxAge": parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN!) * 1000,
                "domain": process.env.COOKIES_DOMAIN,
                "httpOnly": true,
                "sameSite": process.env.NODE_ENV === "production" ? "none" : "strict"
            });

        } catch (e) {

        }
    }

    static async update(res: Response, token: any) {
        token = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
        const {loginAttempts, exp,} = token;
        const payload = {loginAttempts: +loginAttempts + 1};
        const expirationTime = exp - Math.floor(Date.now() / 1000);

        token = generateToken(
            payload,
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: `${expirationTime}s`}
        );

        res.cookie("_at", token, {
            "secure": process.env.NODE_ENV === "production",
            "maxAge": expirationTime * 1000,
            "domain": process.env.COOKIES_DOMAIN,
            "httpOnly": true,
            "sameSite": process.env.NODE_ENV === "production" ? "none" : "strict"
        });

    }
}

export default AccessTokenCookie;

