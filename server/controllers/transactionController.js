
import newdb from "../db/db";
import jwt from "jsonwebtoken";
class TransactionController{
    getAllTransactionForAnAccountSpecificTransaction(req, res) {
        const accountNumber = req.params.accountNumber;
        const transactionId = req.params.transactionId
        
        const sql = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(accountNumber)}'`;
        newdb.query(sql).then((result)=>{
            if(result.rows.length){
                const sql1 = `SELECT * FROM transactions WHERE accountnumber = '${parseInt(accountNumber)}'`;
                newdb.query(sql1).then((result) =>{
                    if (result.rows.length){
                        const sql2 = `SELECT * FROM transactions WHERE id = '${parseInt(transactionId)}'`;
                        newdb.query(sql2).then((results)=>{
                            if(results.rows.length){
                                return res.status(200).json({status: 200},results.rows);
                            }else{
                                return res.status(400).json({
                                    status: 400,
                                    error: `There is not transactions with: ${transactionId} as a transaction id`,
                                }); 
                            }
                            
                        });
                    }else{
                        return res.status(400).json([{
                            status: 400,
                            error: `There is not transactions with: ${accountNumber} as an account`,
                        }]);
                    }
                })
            }else {
                return res.status(400).json({
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                });
            }
        });
    }
    getAllTransactionForAnAccount(req, res) {
        const accountNumber = req.params.accountNumber;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        const email = decoded.emails;
        let owner = '';
        const sql4 = `SELECT * FROM users WHERE email = '${email}'`;
        newdb.query(sql4).then((result) => {
            owner = result.rows[0].id;
            const sql = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(accountNumber)}'`;
            newdb.query(sql).then((result) => {
                if (result.rows.length) {
                        if(result.rows[0].owner === owner){
                            const sql1 = `SELECT * FROM transactions WHERE accountnumber = '${parseInt(accountNumber)}'`;
                            newdb.query(sql1).then((result) => {
                                if (result.rows.length) {
                                    return res.status(200).json({ status: 200, massage: "need hellp", data: result.rows });
                                } else {
                                    return res.status(400).json({
                                        status: 400,
                                        error: `account:'${accountNumber}' doesn't have transaction yet!`,
                                    });
                                }
                            });
                    }else{
                        return res.status(403).json({
                            status: 403,
                            error: `Not allowed to access data for account '${accountNumber}'`,
                        });
                    }
                }else{
                    return res.status(400).json({
                        status: 400,
                        error: `account with: ${accountNumber} does not exists `,
                    });
                }
            });
        });
    }
    debiteAccountNew(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        const email = decoded.emails;

        const amount = parseFloat(req.body.amount);
        const accountNumber = parseInt(req.params.accountNumber);
        const sql4 = `SELECT * FROM users WHERE email = '${email}'`;

        newdb.query(sql4).then((result) => {
            let cachierId = result.rows[0].id;
            const sql3 = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(req.params.accountNumber)}'`;
            newdb.query(sql3).then((result) => {
                
                if (result.rows.length) {
                    
                    if (amount > 0) {
                        if(result.rows[0].balance > amount){
                            const newBalance = parseFloat(result.rows[0].balance) - amount;
                            const sql4 = `UPDATE accounts SET balance ='${newBalance}' WHERE accountnumber ='${accountNumber}'`;
                            newdb.query(sql4).then((result) => {
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
                                return res.status(200).json({ status: 200, data: result.rows });
                            });
                        }else{
                            return res.status(400).json({
                                status: 400,
                                error: `The balance is less than the amount! `,
                            });
                        }
                    } else {
                        return res.status(400).json({
                            status: 400,
                            error: `The amount should not be less than zero! `,
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
    creditAccountNew(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        const email = decoded.emails;

        const amount = parseFloat(req.body.amount);
        const accountNumber = parseInt(req.params.accountNumber);
        
        const sql4 = `SELECT * FROM users WHERE email = '${email}'`;
        newdb.query(sql4).then((result) => {
            let cachierId = result.rows[0].id;
            const sql3 = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(req.params.accountNumber)}'`;
            newdb.query(sql3).then((result) => {
                
                if (result.rows.length) {
                    if(amount> 0){
                        const newBalance = parseFloat(result.rows[0].balance) + amount;
                        const sql4 = `UPDATE accounts SET balance ='${newBalance}' WHERE accountnumber ='${accountNumber}'`;
                        newdb.query(sql4).then((result) => {
                        });

                        const newTransaction = [
                            new Date(),
                            "credit",
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
                            return res.status(200).json({ status: 200, data: result.rows });
                        });
                    }else{
                        return res.status(400).json({
                            status: 400,
                            error: `The amount should not be less than zero! `,
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
}

const tran = new TransactionController();

export default tran;