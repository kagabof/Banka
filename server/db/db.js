import pg,{ Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pools = {
    connectionString: process.env.DATABASE_URL,
};

class DatabBase {
    constructor(){
        this.pool = new Pool(pools);
        this.connect =async () => this.pool.connect(); 

        this.usersTable = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR UNIQUE NOT NULL,
            firstName VARCHAR NOT NULL,
            lastName VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            type VARCHAR NOT NULL,
            isAdmin BOOLEAN NOT NULL
        )`;

        this.accountsTable = `
        CREATE TABLE IF NOT EXISTS accounts(
            id SERIAL PRIMARY KEY,
            accountNumber INT UNIQUE NOT NULL,
            createdOn DATE NOT NULL,
            owner INT NOT NULL,
            type VARCHAR NOT NULL,
            status VARCHAR NOT NULL,
            balance NUMERIC NOT NULL
        )`;

        this.transactionsTable = `
        CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            createdOn TIMESTAMP,
            type VARCHAR NOT NULL,
            accountNumber INT NOT NULL,
            cashier INT NOT NULL,
            amount NUMERIC NOT NULL,
            oldBalance NUMERIC NOT NULL,
            newBAlance NUMERIC NOT NULL  
        )`;

        this.initDataBase();
    }

    async query(sql, data = []) {
        const con = await this.connect();
        try {
            if(data.length){
                return await con.query(sql, data);
            }
            return await con.query(sql);
        } catch (err) {
            return err;
        } finally{
            con.release();
        }
    }

    async initDataBase(){
        await this.query(this.usersTable);
        await this.query(this.accountsTable);
        await this.query(this.transactionsTable);
        console.log("accountsTable, usersTable, transactionsTable");
    }

}

export default new DatabBase;
