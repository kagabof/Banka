import userDb from "./../db/userDB";
import accountDb from "./../db/accountDB";
import transactionDb from "./../db/transactionDB";
import Validator from "validatorjs";

class TransactionController{
    debiteAccount(req,res){
            let accountFound;
            let accountIndex;

            accountDb.map((account, index) => {
                if (account.accountNumber === parseInt(req.params.account, 10)) {
                    accountFound = account;
                    accountIndex = index;
                }
            }); 

            if (!accountFound) {
                return res.status(400).send({
                    status: 400,
                    error: "account not found",
                });
            } else if (accountFound.balance < parseFloat(req.body.amount)) {
                return res.status(400).send({
                    status: 400,
                    error: "balance is less than the amount",
                });
            } else {
                const newTransaction = {
                    id: transactionDb.length + 1,
                    creatOn: Date.now(),
                    type: "debit",
                    accountNmber: parseInt(req.params.account),
                    cachier: parseInt(req.body.cachierId),
                    amount: parseFloat(req.body.amount),
                    oldBalance: accountFound.balance,
                    newBalance: accountFound.balance - parseFloat(req.body.amount),
                };

                transactionDb.push(newTransaction);

                const newAccount = {
                    id: accountFound.id,
                    accountNumber: parseInt(req.params.account),
                    createOn: accountFound.createOn,
                    owner: accountFound.owner,
                    type: accountFound.type,
                    status: accountFound.status,
                    balance: accountFound.balance - parseFloat(req.body.amount),
                };
                accountDb.splice(accountIndex, 1, newAccount);
                return res.status(201).send({
                    status: 201,
                    error: "true",
                    data: {
                        transactionId: newTransaction.id,
                        accountNumber: parseInt(req.params.account),
                        amount: parseFloat(req.body.amount),
                        cachier: parseInt(req.body.cachierId),
                        transactionType: newTransaction.type,
                        oldBalance: accountFound.balance,
                        accountBalance: newAccount.balance,
                    }
                });
            }
        
    }

    creditAccount(req, res) {
            let accountFound;
            let accountIndex;

            accountDb.map((account, index) => {
                if (account.accountNumber === parseInt(req.params.account, 10)) {
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
                const newTransaction = {
                    id: transactionDb.length + 1,
                    creatOn: Date.now(),
                    type: "debit",
                    accountNmber: parseInt(req.params.account),
                    cachier: parseInt(req.body.cachierId),
                    amount: parseFloat(req.body.amount),
                    oldBalance: accountFound.balance,
                    newBalance: accountFound.balance - parseFloat(req.body.amount),
                };

                transactionDb.push(newTransaction);

                const newAccount = {
                    id: accountFound.id,
                    accountNumber: parseInt(req.params.account),
                    createOn: accountFound.createOn,
                    owner: accountFound.owner,
                    type: accountFound.type,
                    status: accountFound.status,
                    balance: accountFound.balance + parseFloat(req.body.amount),
                };
                accountDb.splice(accountIndex, 1, newAccount);
                return res.status(201).send({
                    status: 201,
                    error: "true",
                    data: {
                        transactionId: newTransaction.id,
                        accountNumber: parseInt(req.params.accountNumber),
                        amount: parseFloat(req.body.amount),
                        cachier: parseInt(req.body.cachierId),
                        transactionType: newTransaction.type,
                        oldBalance: accountFound.balance,
                        accountBalance: newAccount.balance,
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

    getAllTransactionForAccount(req, res) {
            const findAccountInTransactions = transactionDb.find(ac => ac.accountNumber === parseInt(req.params.accountNumber));
            const accountFound = transactionDb.filter((accountN) => accountN.accountNumber === parseInt(req.params.accountNumber));
        if (findAccountInTransactions) {
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
        }
}

const tran = new TransactionController();

export default tran;