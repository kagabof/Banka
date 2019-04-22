import db from "./../db/accountDB";
import userdb from "./../db/userDB";
import crypto from "crypto";
import format from "biguint-format";
import newdb from "./../db/db";


class AccountController{
    activateDeactivateAccountNew(req, res) {
        const accountNumber = req.params.accountNumber;
        const sql = `SELECT * FROM accounts WHERE accountnumber='${accountNumber}'`;
        newdb.query(sql).then((result) => {
            console.log(result.rows);
            const accountData = result.rows[0];
            const accountStatus = result.rows[0].status;
            console.log(result.rows[0].status);

            if (result.rows.length) {
                let dormant = "dormant";
                let active = "active"
                if (accountStatus === "dormant") {
                    const sql1 = `UPDATE accounts SET status ='${active}' WHERE accountnumber='${accountNumber}'`;
                    newdb.query(sql1).then((result) => {
                        console.log(result.rows);
                        return res.status(200).json([{
                            status: 200,
                            massage: `account apdated`
                        }, result.rows]);
                    })
                } else if (accountStatus === "active") {
                    const sql2 = `UPDATE accounts SET status ='${dormant}' WHERE accountnumber='${accountNumber}'`;
                    newdb.query(sql2).then((result) => {
                        console.log(result.rows);
                        return res.status(200).json([{
                            status: 200,
                            massage: `account apdated`
                        }, result.rows]);
                    });
                }
            } else {
                return res.status(400).json([{
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                }]);
            }
        });

    }
    accountDeleteNew(req, res) {
        const accountNumber = req.params.accountNumber;
        const sql = `SELECT * FROM accounts WHERE accountnumber='${accountNumber}'`;

        newdb.query(sql).then((result) => {
            console.log(result.rows);
            const accountData = result.rows[0];
            if (result.rows.length) {
                const sql1 = `DELETE FROM accounts WHERE accountnumber = '${accountNumber}' ;`
                newdb.query(sql1).then((result) => {
                    console.log(result.rows);
                    return res.status(200).json([{
                        status: 200,
                        massage: `account with: ${accountNumber} was deleted! `,
                        data: {
                            accountData
                        },
                    }])
                })
            }else{
                return res.status(400).json([{
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                }]);
            }
        })
    }
    createAccountNew(req,res){
        const { email,type} = req.body;
        
        const sql = `SELECT * FROM users WHERE email='${email}'`;

        newdb.query(sql).then((result) =>{
            console.log(result.rows);
            
            const balance = 0;

            if (!result.rows.length){
                res.status(404).json([{
                    status: 404,
                    error: `user with ${email} as an email those not exist`,
                }]);
            }else{
                
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
                console.log(newAccount[0]);
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
                    console.log(result.rows);
                    return res.status(201).json([{
                        status: 201,
                        data: {
                            fname,
                            lname,
                            AccountEmail,
                            type,
                            balance,
                        },
                    }]);
                });
            }
        })

    }
    findAllAccounts(req,res){
        return res.status(200).send({
            status: 200,
            data: db
        });
    }

    findAnAccount(req,res){
            let accountFound;
            let accountIndex;

            db.map((account, index) => {
                if (account.accountNumber === parseInt(req.params.accountNumber, 10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            });
            if (!accountFound) {
                return res.status(400).send({
                    status: 400,
                    error: "sorry, account-number not found.",
                });
            } else {
                return res.status(200).send({
                    status: 200,
                    message: 'Account successfully found.',
                    date: accountFound
                });
            }
        }
}

const acc = new AccountController();
 export default acc;