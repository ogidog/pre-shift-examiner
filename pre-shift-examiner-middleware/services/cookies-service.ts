import {generateToken, verifyToken} from "./jwt-service";
import {IAccessTokenPayload,} from "pre-shift-examiner-types";

export class AccessTokenCookie {

    static async onLogin(): Promise<any> {
        try {
            const payload: IAccessTokenPayload | any = {loginAttempts: 1}
            const token = generateToken(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!}
            );

            return Promise.resolve({
                cookieValue: token,
                cookieOptions: {
                    "secure": process.env.NODE_ENV === "production",
                    "maxAge": parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN!) * 1000,
                    "domain": process.env.COOKIES_DOMAIN,
                    "httpOnly": true,
                    "sameSite": process.env.NODE_ENV === "production" ? "none" : "strict"
                }
            });

        } catch (e) {
            return Promise.reject();
        }
    }

    static async onError(token: any): Promise<any> {
        try {
            let payload: IAccessTokenPayload = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
            const {loginAttempts, exp,} = payload!;
            payload = {
                ...payload,
                loginAttempts: +loginAttempts! + 1,
            };
            const expirationTime = +exp! - Math.floor(Date.now() / 1000);

            delete payload.iat;
            delete payload.exp;

            token = generateToken(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn: `${expirationTime}s`}
            );

            return Promise.resolve({
                cookieValue: token,
                cookieOptions: {
                    "secure": process.env.NODE_ENV === "production",
                    "maxAge": expirationTime * 1000,
                    "domain": process.env.COOKIES_DOMAIN,
                    "httpOnly": true,
                    "sameSite": process.env.NODE_ENV === "production" ? "none" : "strict"
                }
            });

        } catch (e) {
            return Promise.reject();
        }
    }

    static async onLoggedIn(token: any, newPayload: IAccessTokenPayload): Promise<any> {
        try {

            let payload: IAccessTokenPayload = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
            payload = {
                ...payload!,
                ...newPayload,
            };
            const expirationTime = newPayload.testDuration! + 10;

            delete payload.iat;
            delete payload.exp;

            token = generateToken(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn: `${expirationTime}s`}
            );

            return Promise.resolve({
                cookieValue: token,
                cookieOptions: {
                    "secure": process.env.NODE_ENV === "production",
                    "maxAge": expirationTime * 1000,
                    "domain": process.env.COOKIES_DOMAIN,
                    "httpOnly": true,
                    "sameSite": process.env.NODE_ENV === "production" ? "none" : "strict"
                }
            });

        } catch (e) {
            return Promise.reject();
        }
    }
}

export default AccessTokenCookie;

