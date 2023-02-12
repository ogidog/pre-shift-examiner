import {CustomValidator} from 'express-validator';
import {verifyToken} from "../shared/services/jwt-service";
import {IAccessTokenPayload} from "pre-shift-examiner-types";

export const tokenValidator: CustomValidator = async cookies => {
    const token = cookies?._at;
    if (!token) {
        return Promise.reject(false);
    }

    const payload: IAccessTokenPayload = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET!) as IAccessTokenPayload;
    if (!payload) {
        return Promise.reject(false);
    }

    if (Date.now() - payload.requestTime < Number(process.env.REQUEST_DELAY)) {
        return Promise.reject(false);
    }

    return Promise.resolve(true);
};
