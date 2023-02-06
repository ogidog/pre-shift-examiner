import dotenv from "dotenv";

export const config = () => {
    dotenv.config();
    dotenv.config({path: `${process.cwd()}/.env.${process.env.NODE_ENV}.local`});
}
