import {Pool} from "pg";

let connectionString: string = "";
if (process.env.NODE_ENV = 'production') {
    connectionString = <string>process.env.DB_CONNECTION_STRING_PROD;
} else {
    connectionString = <string>process.env.DB_CONNECTION_STRING_DEV;
}
let  pool = new Pool({connectionString});

// pool = new Pool({
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: Number(process.env.DB_PORT),
//     host: process.env.DB_HOST
// });

export default pool;
