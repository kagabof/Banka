import db from "./../db/accountDB";
import userdb from "./../db/userDB";
import crypto from "crypto";
import format from "biguint-format";


class AccountController{
    createAccount(req,res){
        
            let userIndex;
            let userFind;

            userdb.map((user, index) => {
                if (user.id === parseInt(req.body.owner, 10)) {
                    userFind = user;
                    userIndex = index;
                }
            })

            if (!userFind) {
                return res.status(404).send({
                    status: 404,
                    error: "Sorry, the owner thos not exist!",
                });
            } 

            const random = (qty) => {
                return crypto.randomBytes(qty)
            }
            const account = {
                id: parseInt(format(random(4), 'dec')),
                accountNumber: parseInt(format(random(8), 'dec')),
                createOn: Date.now(),
                owner: req.body.owner,
                type: req.body.type,
                status: "dormant",
                balance: 0,
            }


            db.push(account);
            return res.status(201).send({
                status: 201,
                data: {
                    accountNumber: account.accountNumber,
                    firstName: userFind.firstName,
                    lastName: userFind.lastName,
                    email: userFind.email,
                    type: req.body.type,
                    balance: account.balance,
                },
            });
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