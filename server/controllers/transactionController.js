
import newdb from "../db/db";
import jwt from "jsonwebtoken";
class TransactionController{
    getAllTransactionForAnAccountSpecificTransaction(req, res) {
        const accountNumber = req.params.accountNumber;
        const transactionId = req.params.transactionId
        
        const sql = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(accountNumber)}'`;
        newdb.query(sql).then((result)=>{
            console.log(result.rows);
            if(result.rows.length){
                const sql1 = `SELECT * FROM transactions WHERE accountnumber = '${parseInt(accountNumber)}'`;
                newdb.query(sql1).then((result) =>{
                    console.log(result.rows);
                    if (result.rows.length){
                        const sql2 = `SELECT * FROM transactions WHERE id = '${parseInt(transactionId)}'`;
                        newdb.query(sql2).then((results)=>{
                            console.log(results.rows);
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
        const sql = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(accountNumber)}'`;
        newdb.query(sql).then((result) => {
            console.log(result.rows);
            if (result.rows.length) {
                const sql1 = `SELECT * FROM transactions WHERE accountnumber = '${parseInt(accountNumber)}'`;
                newdb.query(sql1).then((result) => {
                    console.log(result.rows);
                    if (result.rows.length) {
                        return res.status(200).json({status: 200,massage:"need hellp",data:result.rows});   
                    } else {
                        return res.status(400).json({
                            status: 400,
                            error: `There is not transactions with: ${accountNumber} as an account`,
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    error: `account with: ${accountNumber} does not exists `,
                });
            }
        });
    }
    debiteAccountNew(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        const email = decoded.emails;

        const amount = parseFloat(req.body.amount);
        const accountNumber = parseInt(req.params.accountNumber);
        const sql4 = `SELECT * FROM accounts WHERE email = '${email}'`;

        newdb.query(sql4).then((result) => {
            console.log(result.rows);
            const sql3 = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(req.params.accountNumber)}'`;
            newdb.query(sql3).then((result) => {
                console.log(result.rows);
                
                if (result.rows.length) {
                    let cachierId = result.rows[0].id;
                    const newBalance = parseFloat(result.rows[0].balance) - amount;
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
                        console.log("************DEBIT TRANSACTIONS*******");
                        console.log(result.rows);
                        return res.status(200).json({ status: 200 , data:result.rows})
                    });
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
        const sql4 = `SELECT * FROM accounts WHERE email = '${email}'`;
        
        newdb.query(sql4).then((result) => {
            console.log(result.rows);
            const sql3 = `SELECT * FROM accounts WHERE accountnumber = '${parseInt(req.params.accountNumber)}'`;
            newdb.query(sql3).then((result) => {
                console.log(result.rows);
                
                if (result.rows.length) {
                    let cachierId = result.rows[0].id;
                    const newBalance = parseFloat(result.rows[0].balance) + amount;
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
                        return res.status(200).json({ status: 200, data: result.rows });
                    });
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