import dotenv from "dotenv";

export const initConfig = () => {
    dotenv.config();

    if (process.env.NODE_ENV === 'production') {
        process.env["DB_CONNECTION_STRING"] = <string>process.env.DB_CONNECTION_STRING_PROD;
        process.env["CLIENT_HOST"] = <string>process.env.CLIENT_HOST_PROD;
    } else {
        process.env["DB_CONNECTION_STRING"] = <string>process.env.DB_CONNECTION_STRING_DEV;
        process.env["CLIENT_HOST"] = <string>process.env.CLIENT_HOST_DEV;
    }
}
