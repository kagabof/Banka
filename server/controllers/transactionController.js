import userDb from "./../db/userDB";
import accountDb from "./../db/accountDB";
import transactionDb from "./../db/transactionDB";
import Validator from "validatorjs";
import newdb from "../db/db";

class TransactionController{
    debiteAccountNew(req, res) {
        const amount = parseFloat(req.body.amount);
        const { cachierId } = req.body;
        const accountNumber = req.params.accountAccount;

        const sql = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(req.params.accountNumber)}'`;
        newdb.query(sql).then((result) => {
            console.log(result.rows);
            if (result.rows.length){
                if (result.rows[0].balance > amount) {
                    const newBalance = result.rows[0].balance - amount;
                    const sql1 = `UPDATE accounts SET balance ='${newBalance}' WHERE accountnumber='${accountNumber}'`;
                    newdb.query(sql1).then((result) => {
                        console.log("************UPDATE ACCOUNT*******");
                        console.log(result.rows);
                    });

                    const newTransaction = [
                        new Date(),
                        "debit",
                        result.rows[0].accountnumber,
                        cachierId,
                        amount,
                        result.rows[0].balance,
                        newBalance
                    ]
                    const sql2 = `INSERT INTO transactions(
                        createdOn,
                        type,
                        accountNumber,
                        cashier,
                        amount,
                        oldbalance,
                        newbalance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
                    newdb.query(sql2, newTransaction).then((result) => {
                        console.log("************CREATE TRANSACTIONS*******");
                        console.log(result.rows);
                        return res.status(200).json([{ status: 200 }, result.rows])
                    });

                } else {
                    return res.status(400).json([{
                        status: 400,
                        error: "balance is less than the amount",
                    }]);
                }
            }else{
                return res.status(400).json([{
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                }]);
            }
            
        });
    }
    creditAccountNew(req, res) {
        const amount = parseFloat(req.body.amount);
        const { cachierId } = req.body;
        const accountNumber = parseInt(req.params.accountNumber);

        const sql3 = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(req.params.accountNumber)}'`;
        newdb.query(sql3).then((result) => {
            console.log(result.rows);
            if (result.rows.length) {
                    const newBalance = result.rows[0].balance + amount;
                const sql4 = `UPDATE accounts SET balance ='${newBalance}' WHERE accountnumber ='${accountNumber}'`;
                    newdb.query(sql4).then((result) => {
                        console.log("************UPDATE ACCOUNT*******");
                        console.log(result.rows);
                    });

                    const newTransaction = [
                        new Date(),
                        "debit",
                        result.rows[0].accountnumber,
                        cachierId,
                        amount,
                        result.rows[0].balance,
                        newBalance
                    ]
                    const sql5 = `INSERT INTO transactions(
                        createdOn,
                        type,
                        accountNumber,
                        cashier,
                        amount,
                        oldbalance,
                        newbalance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
                    newdb.query(sql5, newTransaction).then((result) => {
                        console.log("************CREATE TRANSACTIONS*******");
                        console.log(result.rows);
                        return res.status(200).json([{ status: 200 }, result.rows])
                    });
            } else {
                return res.status(400).json([{
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                }]);
            }

        });
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