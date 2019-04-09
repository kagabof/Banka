import userDb from "./../db/userDB";
import accountDb from "./../db/accountDB";
import transactionDb from "./../db/transactionDB";

class TransactionController{
    debiteAccount(req,res){
        const accountNumber = parseInt(req.params.account);
        const amount = parseFloat(req.body.amount);
        const cachierId = parseInt(req.body.cachierId);

        let accountFound;
        let accountIndex;

        accountDb.map((account, index) => {
            if (account.accountNumber === accountNumber) {
                accountFound = account;
                accountIndex = index;
            }

        }); 

        if (!accountNumber){
            return res.status(400).send({
                status: 400,
                error: "account required",
            }); 
        }else if(!amount){
            return res.status(400).send({
                status: 400,
                error: "amount required",
            });
        } else if (!accountFound) {
            return res.status(400).send({
                status: 400,
                error: "account not found",
            });
        } else if (accountFound.balance < amount) {
            return res.status(400).send({
                status: 400,
                error: "balance is less than the amount",
            });
        }else {
            const newTransaction = {
                id: transactionDb.length + 1,
                creatOn: Date.now(),
                type: "debit",
                accountNmber: accountNumber,
                cachier: cachierId,
                amount: amount,
                oldBalance: accountFound.balance,
                newBalance: accountFound.balance - amount,
            };

            transactionDb.push(newTransaction);

            const newAccount = {
                id: accountFound.id,
                accountNumber: accountNumber,
                createOn: accountFound.createOn,
                owner: accountFound.owner,
                type: accountFound.type,
                status: accountFound.status,
                balance: accountFound.balance - amount,
            };
            accountDb.splice(accountIndex,1,newAccount);
            return res.status(201).send({
                status: 201,
                error: "true",
                data: {
                    transactionId: newTransaction.id,
                    accountNumber: accountNumber,
                    amount: amount,
                    cachier: cachierId,
                    transactionType: newTransaction.type,
                    oldBalance: accountFound.balance,
                    accountBalance: newAccount.balance,
                }
            });
        }
    }

    creditAccount(req, res) {
        const accountNumber = parseInt(req.params.account);
        const amount = parseFloat(req.body.amount);
        const cachierId = parseInt(req.body.cachierId);

        let accountFound;
        let accountIndex;

        accountDb.map((account, index) => {
            if (account.accountNumber === accountNumber) {
                accountFound = account;
                accountIndex = index;
            }

        });

        if (!accountNumber) {
            return res.status(400).send({
                status: 400,
                error: "account required",
            });
        } else if (!amount) {
            return res.status(400).send({
                status: 400,
                error: "amount required",
            });
        } else if (!accountFound) {
            return res.status(400).send({
                status: 400,
                error: "account not found",
            });
        } else {
            const newTransaction = {
                id: transactionDb.length + 1,
                creatOn: Date.now(),
                type: "debit",
                accountNmber: accountNumber,
                cachier: cachierId,
                amount: amount,
                oldBalance: accountFound.balance,
                newBalance: accountFound.balance - amount,
            };

            transactionDb.push(newTransaction);

            const newAccount = {
                id: accountDb.id,
                accountNumber: accountNumber,
                createOn: accountDb.createOn,
                owner: accountDb.owner,
                type: accountDb.type,
                status: accountDb.status,
                balance: accountFound.balance + amount,
            };
            accountDb.splice(accountIndex,1,newAccount);
            
            return res.status(201).send({
                status: 201,
                data: {
                    transactionId: newTransaction.id,
                    accountNumber: accountNumber,
                    amount: amount,
                    cachier: cachierId,
                    transactionType: newTransaction.type,
                    oldBalance: accountFound.balance,
                    accountBalance: newAccount.balance,
                }
            });
        }
    }
}

const tran = new TransactionController();

export default tran;