import dotenv from "dotenv";

let env = process.env.NODE_ENV;

dotenv.config();
const dev = {
    app: {

        port:3100
    },
    dbUrl: process.env.DATABASE_URL
}
const test = {
    app: {
        port: 3100
    },
    dbUrl: process.env.TESTDB_URL   
}

const config ={
    dev,
    test,
    env
}

export default config;