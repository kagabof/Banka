import userDb from "./../db/userDB";
import accountDb from "./../db/accountDB";
import transactionDb from "./../db/transactionDB";
import Validator from "validatorjs";

class TransactionController{
    debiteAccount(req,res){
        const data = {
            accountNumber: req.params.account,
            amount: req.body.amount,
            cachierId: req.body.cachierId
        };
        
        const rules = {
            accountNumber: 'required|integer',
            amount: 'required|numeric',
            cachierId: 'integer',
        }

        const validation = new Validator(data,rules);
        
        if(validation.passes()){
            let accountFound;
            let accountIndex;

            accountDb.map((account, index) => {
                if (account.accountNumber === parseInt(data.accountNumber, 10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            }); 

            if (!accountFound) {
                return res.status(400).send({
                    status: 400,
                    error: "account not found",
                });
            } else if (accountFound.balance < parseFloat(data.amount)) {
                return res.status(400).send({
                    status: 400,
                    error: "balance is less than the amount",
                });
            } else {
                const newTransaction = {
                    id: transactionDb.length + 1,
                    creatOn: Date.now(),
                    type: "debit",
                    accountNmber: parseInt(data.accountNumber),
                    cachier: parseInt(data.cachierId),
                    amount: parseFloat(data.amount),
                    oldBalance: accountFound.balance,
                    newBalance: accountFound.balance - parseFloat(data.amount),
                };

                transactionDb.push(newTransaction);

                const newAccount = {
                    id: accountFound.id,
                    accountNumber: parseInt(data.accountNumber),
                    createOn: accountFound.createOn,
                    owner: accountFound.owner,
                    type: accountFound.type,
                    status: accountFound.status,
                    balance: accountFound.balance - parseFloat(data.amount),
                };
                accountDb.splice(accountIndex, 1, newAccount);
                return res.status(201).send({
                    status: 201,
                    error: "true",
                    data: {
                        transactionId: newTransaction.id,
                        accountNumber: parseInt(data.accountNumber),
                        amount: parseFloat(data.amount),
                        cachier: parseInt(data.cachierId),
                        transactionType: newTransaction.type,
                        oldBalance: accountFound.balance,
                        accountBalance: newAccount.balance,
                    }
                });
            }
        }else {
            return res.status(406).send({
                status: 406,
                error: {
                    accountNumber: validation.errors.first("accountNumber"),
                    amount: validation.errors.first("amount"),
                    cachierId: validation.errors.first("cachierId"),
                }
            });
        }
    }

    creditAccount(req, res) {
        const data = {
            accountNumber: req.params.account,
            amount: req.body.amount,
            cachierId: req.body.cachierId
        };

        const rules = {
            accountNumber: 'required|integer',
            amount: 'required|numeric',
            cachierId: 'integer',
        }

        const validation = new Validator(data, rules);

        if (validation.passes()) {
            let accountFound;
            let accountIndex;

            accountDb.map((account, index) => {
                if (account.accountNumber === parseInt(data.accountNumber, 10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            });

            if (!accountFound) {
                return res.status(400).send({
                    status: 400,
                    error: "account not found",
                });
            } else {
                const newTransaction = {
                    id: transactionDb.length + 1,
                    creatOn: Date.now(),
                    type: "debit",
                    accountNmber: parseInt(data.accountNumber),
                    cachier: parseInt(data.cachierId),
                    amount: parseFloat(data.amount),
                    oldBalance: accountFound.balance,
                    newBalance: accountFound.balance - parseFloat(data.amount),
                };

                transactionDb.push(newTransaction);

                const newAccount = {
                    id: accountFound.id,
                    accountNumber: parseInt(data.accountNumber),
                    createOn: accountFound.createOn,
                    owner: accountFound.owner,
                    type: accountFound.type,
                    status: accountFound.status,
                    balance: accountFound.balance + parseFloat(data.amount),
                };
                accountDb.splice(accountIndex, 1, newAccount);
                return res.status(201).send({
                    status: 201,
                    error: "true",
                    data: {
                        transactionId: newTransaction.id,
                        accountNumber: parseInt(data.accountNumber),
                        amount: parseFloat(data.amount),
                        cachier: parseInt(data.cachierId),
                        transactionType: newTransaction.type,
                        oldBalance: accountFound.balance,
                        accountBalance: newAccount.balance,
                    }
                });
            }
        } else {
            return res.status(406).send({
                status: 406,
                error: {
                    accountNumber: validation.errors.first("accountNumber"),
                    amount: validation.errors.first("amount"),
                    cachierId: validation.errors.first("cachierId"),
                }
            });
        }
    }
    getAllTransaction(req, res) {
        return res.status(200).send({
            status: 200,
            data: transactionDb
        })
    }

    getAllTransactionFoAccount(req, res) {
        const data = {
            accountNumber: req.params.accountNumber
        };
        const rules = {
            accountNumber: "required|integer"
        }
        const validation = new Validator(data,rules);

        if(validation.passes()){
            const accountN = accountDb.find(ac => ac.accountNumber === parseInt(data.accountNumber));
            const TaccountN = transactionDb.find(ac => ac.accountNumber === parseInt(data.accountNumber));
            const accountFound = transactionDb.filter((accountN) => accountN.accountNumber === parseInt(data.accountNumber));
            if (TaccountN) {
                return res.status(200).send({
                    status: 200,
                    data: accountFound,
                });

            } else {
                return res.status(404).send({
                    status: 404,
                    error: 'Zero transaction to the account given',
                });
            }
        } else {
            return res.status(406).send({
                status: 406,
                error: {
                    accountNumber: validation.errors.first("accountNumber")
                }
            });
        }

        
    }
}

const tran = new TransactionController();

export default tran;