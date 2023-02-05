import {Pool, PoolConfig} from "pg";

const connectionString = process.env.DB_CONNECTION_STRING;
let  pool = new Pool({connectionString});

export default pool;
