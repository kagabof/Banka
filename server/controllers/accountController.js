import crypto from "crypto";
import format from "biguint-format";
import newdb from "./../db/db";
import jwt from "jsonwebtoken";


class AccountController{
    findAllAccounts(req, res) {
        const status = req.query.status;
        if (status === "dormant") {
            const sql = `SELECT * FROM accounts WHERE status = '${status}'`;
            newdb.query(sql).then((result) => {
                if (result.rows.length) {
                    const accounts= [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const data = {
                            status: 200,
                            data: result.rows[i].id,
                            accountNumber: result.rows[i].accountnumber,
                            createdOn: result.rows[i].createdon,
                            owner: result.rows[i].owner,
                            type: result.rows[i].status,
                            balance: result.rows[i].balance
                        }
                        accounts.push(data);
                    }
                    return res.status(200).json({ accounts });
                } else {
                    return res.status(404).json({
                        status: 404,
                        error: `no account found with dormant status in the system`,
                    });
                }
            });
        } else if (status === "active") {
            newdb.query(`SELECT * FROM accounts WHERE status = '${status}'`).then((result) => {
                
                if (result.rows.length) {
                    const accounts = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const data = {
                            status: 200,
                            data: result.rows[i].id,
                            accountNumber: result.rows[i].accountnumber,
                            createdOn: result.rows[i].createdon,
                            owner: result.rows[i].owner,
                            type: result.rows[i].status,
                            balance: result.rows[i].balance
                        }
                        accounts.push(data);
                    }
                    return res.status(200).json({ accounts });
                } else {
                    return res.status(404).json({
                        status: 404,
                        error: `no account found with active status in the system`,
                    });
                }
            });
        } else if (!status) {
            const sql2 = `SELECT * FROM accounts`;
            newdb.query(sql2).then((result) => {
                if (result.rows.length) {

                    const accounts = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const data = {
                            status: 200,
                            data: result.rows[i].id,
                            accountNumber: result.rows[i].accountnumber,
                            createdOn: result.rows[i].createdon,
                            owner: result.rows[i].owner,
                            type: result.rows[i].status,
                            balance: result.rows[i].balance
                        }
                        accounts.push(data);
                    }
                    return res.status(200).json({ accounts });
                    
                } else {
                    return res.status(404).json({
                        status: 404,
                        error: `no account found in the system`,
                    });
                }
            });
        } else if (status !== 'active' && status !== 'dormant') {
            return res.status(404).json({
                status: 404,
                error: `no account found in the system`,
            });
        }
    }
    findAllAccountOfUser(req,res){
        const email = req.params.email;
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        newdb.query(sql).then((result) =>{
            if (result.rows.length){
                const sql1 = `SELECT * FROM accounts WHERE owner='${result.rows[0].id}'`;
                
                newdb.query(sql1).then((result) =>{
                    const accounts = [];
                    if (result.rows.length){
                        for (let i = 0; i < result.rows.length; i++) {
                            const data = {
                                status: 200,
                                data: result.rows[i].id,
                                accountNumber: result.rows[i].accountnumber,
                                createdOn: result.rows[i].createdon,
                                owner: result.rows[i].owner,
                                type: result.rows[i].status,
                                balance: result.rows[i].balance
                            } 
                            accounts.push(data);
                        }
                        return res.status(200).json({ accounts });
                    } else {
                        return res.status(400).json({
                            status: 400,
                            error: `the user with: ${email} does not have an account`,
                        });
                    }
                })
            }else{
                return res.status(400).json({
                    status: 400,
                    error: `User with: ${email} as email does exist`,
                });
            }
        });
    }
    findAccountDetails(req,res){
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        const email = decoded.emails;
        const sql1 = `SELECT * FROM users WHERE email='${email}'`;
        newdb.query(sql1).then((result) => {
            let owner = result.rows[0].id;
            const accountNumber = req.params.accountNumber;
            const sql = `SELECT * FROM accounts WHERE accountnumber='${accountNumber}'`;
            newdb.query(sql).then((result) => {
                if (result.rows.length) {
                    if(result.rows[0].owner === owner){
                        const accounts = [];
                        for (let i = 0; i < result.rows.length; i++) {
                            const data = {
                                status: 200,
                                data: result.rows[i].id,
                                accountNumber: result.rows[i].accountnumber,
                                createdOn: result.rows[i].createdon,
                                owner: result.rows[i].owner,
                                type: result.rows[i].status,
                                balance: result.rows[i].balance
                            }
                            accounts.push(data);
                        }
                        return res.status(200).json({ accounts });
                    }else{
                        return res.status(403).json({
                            status: 403,
                            error: `Note allowed to access that account information`,
                        });
                    }
                } else {
                    return res.status(400).json({
                        status: 400,
                        error: `account with: ${accountNumber} does not exists `,
                    });
                }
            });
        });
    }
    activateDeactivateAccountNew(req, res) {
        const accountNumber = req.params.accountNumber;
        const sql = `SELECT * FROM accounts WHERE accountnumber='${accountNumber}'`;
        newdb.query(sql).then((result) => {
            if (result.rows.length) {
                const account = result.rows[0].accountnumber;
                const accountStatus = result.rows[0].status;
                let dormant = "dormant";
                let active = "active"
                if (accountStatus === "dormant") {
                    const sql1 = `UPDATE accounts SET status ='${active}' WHERE accountnumber='${accountNumber}'`;
                    newdb.query(sql1).then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: `account updated!`,
                            data: {
                                accountNumber: account,
                                status: 'active'
                            }
                    });
                });
                } else if (accountStatus === "active") {
                    const sql2 = `UPDATE accounts SET status ='${dormant}' WHERE accountnumber='${accountNumber}'`;
                    newdb.query(sql2).then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: `account updated!`,
                            data: {
                                accountNumber: account,
                                status: 'dormant'
                            }
                        });
                    });
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                });
            }
        });

    }
    accountDeleteNew(req, res) {
        const accountNumber = req.params.accountNumber;
        const sql = `SELECT * FROM accounts WHERE accountnumber='${accountNumber}'`;

        newdb.query(sql).then((result) => {
            const accountData = result.rows[0];
            if (result.rows.length) {
                const sql1 = `DELETE FROM accounts WHERE accountnumber = '${accountNumber}' ;`
                newdb.query(sql1).then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: `account with: ${accountNumber} was deleted! `,
                    })
                })
            }else{
                return res.status(400).json({
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                });
            }
        })
    }
    createAccountNew(req,res){
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        const email = decoded.emails;
        const { type} = req.body;
        
        const sql = `SELECT * FROM users WHERE email='${email}'`;

        newdb.query(sql).then((result) =>{
            
            const balance = 0;
                let balances = 0.0;
                const st = "dormant";
                const newAccount = [
                    parseInt(format(crypto.randomBytes(2), 'dec')),
                    new Date(),
                    result.rows[0].id,
                    type,
                    st,
                    parseFloat(balances),
                ];
                const fname = result.rows[0].firstname;
                const lname = result.rows[0].lastname;
                const AccountEmail = result.rows[0].email;
                const sql1 = `INSERT INTO accounts(
                        accountNumber,
                        createdOn,
                        owner,
                        type,
                        status,
                        balance) VALUES($1, $2, $3, $4, $5,$6) RETURNING *`;
                newdb.query(sql1,newAccount).then((result) =>{
                    let acc = result.rows[0].accountnumber;
                    return res.status(201).json({
                        status: 201,
                        data: {
                            firstName:fname,
                            lastName:lname,
                            email:AccountEmail,
                            accountNumber:acc,
                            accountType:type,
                            balance,
                        },
                    });
                });
            }
        )

    }
}

const acc = new AccountController();
 export default acc;