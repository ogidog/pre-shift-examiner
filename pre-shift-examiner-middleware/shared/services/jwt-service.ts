import jwt, {JwtPayload} from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secret: string, options = {expiresIn: '10m'}) => {
    return jwt.sign(payload, secret, options)
}

export const verifyToken = (token: string, secret: string) => {
    return new Promise(resolve => jwt.verify(token, secret, (err, payload) => {
            if (err) {
                resolve(null);
            } else {
                resolve(payload);
            }
        })
    );
}
