import pg,{ Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import config from "./../../config"

dotenv.config();

const pools = {
    connectionString: process.env.NODE_ENV === "test"?  config.test.dbUrl: config.dev.dbUrl,
};

console.log(pools.connectionString);
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
        
        let password = "Fofo1995"
        let hashedPassord = bcrypt.hashSync(password, parseInt(10, 10));
        this.newAdmin = [
            "faustinkagabo@gmail.com",
            "kagabo",
            "faustin",
            hashedPassord,
            "staff",
            true
        ];
        this.check = "SELECT * FROM users";
        this.createAdmin = "INSERT INTO users(email,firstName,lastName,password,type,isAdmin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
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
        await this.query(this.check).then((result) =>{
            if (result.rows.length) {
                console.log("admin exist....");
                
            } else {
                this.query(this.createAdmin, this.newAdmin).then((result) =>{
                    console.log(result.rows);
                });
            }
        });
        console.log("accountsTable, usersTable, transactionsTable");
    }

}

export default new DatabBase;
