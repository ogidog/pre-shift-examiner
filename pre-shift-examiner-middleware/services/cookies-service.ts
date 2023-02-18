import {generateToken} from "./jwt-service";
import {IAccessTokenPayload, ErrorMessages} from "pre-shift-examiner-types";
import {Response} from "express";
import {IResponseObject} from "pre-shift-examiner-types";

export class AccessTokenCookie {

    static create(res: Response, responseObject: IResponseObject): IResponseObject {

        try {
            const payload: IAccessTokenPayload = {requestTime: Date.now()}
            const token = generateToken(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!}
            );

            res.cookie("_at", token, {
                "secure": process.env.NODE_ENV === "production",
                "maxAge": parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE!),
                "domain": process.env.COOKIES_DOMAIN,
                "httpOnly": true,
                "sameSite": process.env.NODE_ENV === "production" ? "none" : "strict"
            });

            return {
                ...responseObject,
                httpStatusCode: 200,
            }

        } catch (e) {
            return {
                ...responseObject,
                httpStatusCode: 500,
                error: {message: ErrorMessages.SERVER_ERROR}
            }
        }
    }
}

export default AccessTokenCookie;

