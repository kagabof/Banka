import db from "./../db/accountDB";
import userdb from "./../db/userDB";
import crypto from "crypto";
import format from "biguint-format";
import Validator from "validatorjs";
import { request } from "http";


class AccountController{
    createAccount(req,res){
        const data = {
            owner: req.body.owner,
            type: req.body.type
        };

        const rules = {
            owner: 'required|integer',
            type: 'required|string',
        }
        const validation = new Validator(data,rules);
        if(validation.passes()){
            let userIndex;
            let userFind;

            userdb.map((user, index) => {
                if (user.id === parseInt(data.owner, 10)) {
                    userFind = user;
                    userIndex = index;
                }
            })

            if (!userFind) {
                return res.status(404).send({
                    status: 404,
                    error: "owner not found!",
                });
            } 

            const random = (qty) => {
                return crypto.randomBytes(qty)
            }
            const account = {
                id: parseInt(format(random(4), 'dec')),
                accountNumber: parseInt(format(random(8), 'dec')),
                createOn: Date.now(),
                owner: data.owner,
                type: data.type,
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
                    type: data.type,
                    balance: account.balance,
                },
            });
        }else{
            return res.status(406).send({
                status: 406,
                error: {
                    owner: validation.errors.first("owner"),
                    type: validation.errors.first("type")
                }
            });
        }
    }

    activateDeactivateAccount(req, res) {
        const data = {
            accountNumber: req.params.accountNumber,
        };
        const rules = {
            accountNumber: 'required|integer'
        };
        const validation = new Validator(data,rules);

        if(validation.passes()){
            const account = db.find(account => account.accountNumber === parseInt(data.accountNumber,10));
            let accountFound;
            let accountIndex;
            
            db.map((account, index) => {
                if (account.accountNumber === parseInt(data.accountNumber,10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            });

            if (!account) {
                return res.status(400).send({
                    status: 400,
                    error: 'account not found',
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
                const account1 = db.find(account => account.accountNumber === parseInt(data.accountNumber,));
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
                const account1 = db.find(account => account.accountNumber === parseInt(data.accountNumber, 10));

                return res.status(201).send({
                    status: 201,
                    data: {
                        accountNumber: account1.accountNumber,
                        accountStatus: account1.status,
                    }
                });
            }
        }else{
            return res.status(404).send({
                status: 404,
                error: {
                    accountNumber: validation.errors.first("accountNumber"),
                }
            });
        }
        
    }
    accountDelete(req, res) {
        const data = {
            accountNumber: req.params.accountNumber,
        };
        const rules = {
            accountNumber: 'required|integer'
        };

        const validation = new Validator(data, rules);
        if(validation.passes()){
            let accountFound;
            let accountIndex;

            db.map((account, index) => {
                if (account.accountNumber === parseInt(data.accountNumber, 10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            });

            if (!accountFound) {
                return res.status(404).send({
                    status: 404,
                    error: "account not found",
                });
            } else {
                db.splice(accountIndex, 1);
                return res.status(202).send({
                    status: 202,
                    message: 'Account successfully deleted',
                    date: accountFound
                });
            }
        } else {
            return res.status(406).send({
                status: 406,
                error: {
                    accountNumber: validation.errors.first("accountNumber"),
                }
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
        const data = {
            accountNumber: req.params.accountNumber,
        };
        const rules = {
            accountNumber: 'required|integer'
        };

        const validation = new Validator(data, rules);
        if (validation.passes()) {
            let accountFound;
            let accountIndex;

            db.map((account, index) => {
                if (account.accountNumber === parseInt(data.accountNumber, 10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            });
            if (!accountFound) {
                return res.status(404).send({
                    status: 404,
                    error: "account not found",
                });
            } else {
                return res.status(200).send({
                    status: 200,
                    message: 'Account successfully found',
                    date: accountFound
                });
            }
        }else{
            return res.status(406).send({
                status: 406,
                error: {
                    accountNumber: validation.errors.first("accountNumber")
                }
            });
        }
    }
}

const acc = new AccountController();
 export default acc;