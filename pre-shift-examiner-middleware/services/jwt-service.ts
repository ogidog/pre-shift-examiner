import {IAccessTokenPayload} from "pre-shift-examiner-types";
import jwt, {JwtPayload} from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secret: string, options = {expiresIn: '10m'}) => {
    return jwt.sign(payload, secret, options)
}

export const verifyToken = (token: string, secret: string): Promise<IAccessTokenPayload> => {
    return new Promise((resolve, reject) => jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject();
            } else {
                resolve(payload as IAccessTokenPayload);
            }
        })
    );
}
