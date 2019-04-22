import db from "./../db/accountDB";
import userdb from "./../db/userDB";
import crypto from "crypto";
import format from "biguint-format";
import newdb from "./../db/db";


class AccountController{
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

    activateDeactivateAccount(req, res) {
            const account = db.find(account => account.accountNumber === parseInt(req.params.accountNumber,10));
            let accountFound;
            let accountIndex;
            
            db.map((account, index) => {
                if (account.accountNumber === parseInt(req.params.accountNumber,10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            });

            if (!account) {
                return res.status(400).send({
                    status: 400,
                    error: 'sorry, account-number not found, create one.',
                });
            } else if (account.status === "active") {
                const newAccount = {
                    id: account.id,
                    accountNumber: account.accountNumber,
                    createOn: account.createOn,
                    owner: account.owner,
                    type: accountFound.type,
                    status: "dormant",
                    balance: account.balance
                };
                db.splice(accountIndex, 1, newAccount);
                const account1 = db.find(account => account.accountNumber === parseInt(req.params.accountNumber,));
                return res.status(201).send({
                    status: 201,
                    data: {
                        accountNumber: account1.accountNumber,
                        status: account1.status
                    }
                });
            } else {
                const newAccount = {
                    id: account.id,
                    accountNumber: account.accountNumber,
                    createOn: account.createOn,
                    owner: account.owner,
                    type: account.type,
                    status: "active",
                    balance: account.balance,
                };
                db.splice(accountIndex, 1, newAccount);
                const account1 = db.find(account => account.accountNumber === parseInt(req.params.accountNumber, 10));

                return res.status(201).send({
                    status: 201,
                    data: {
                        accountNumber: account1.accountNumber,
                        accountStatus: account1.status,
                    }
                });
            }
      
        
    }
    accountDelete(req, res) {
        
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
                    error: "sorry, account-number not found, create one.",
                });
            } else {
                db.splice(accountIndex, 1);
                return res.status(202).send({
                    status: 202,
                    message: 'Account was successfully deleted.',
                    date: accountFound
                });
            }

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