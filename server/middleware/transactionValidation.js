import Validator from "validatorjs";
import newdb from "./../db/db";

class TransactionValidation{
    debiteCreaditAccountValidation(req, res,next){
        const data = {
            accountNumber: req.params.accountNumber,
            amount: req.body.amount,
        };

        const rules = {
            accountNumber: 'required|integer',
            amount: 'required|numeric',
        }

        const validation = new Validator(data, rules);

        if (validation.passes()) {
            next();
        } else {
            return res.status(400).send({
                status: 400,
                error: {
                    accountNumber: validation.errors.first("accountNumber"),
                    amount: validation.errors.first("amount"),
                }
            });
        }
    }
    validateAccountNumber(req, res, next) {
        const data = {
            accountNumber: req.params.accountNumber,
        };
        const rules = {
            accountNumber: 'required|integer'
        };
        const validation = new Validator(data, rules);

        if (validation.passes()) {
            next();
        } else {
            return res.status(400).send({
                status: 400,
                error: {
                    accountNumber: validation.errors.first("accountNumber"),
                }
            });
        }

    }

    validateAccountNumberAndTransactionId(req, res, next) {
        const data = {
            accountNumber: req.params.accountNumber,
            transactionId: req.params.transactionId,
        };
        const rules = {
            accountNumber: 'required|integer',
            transactionId: 'required|integer'
        };
        const validation = new Validator(data, rules);

        if (validation.passes()) {
            next();
        } else {
            return res.status(400).send({
                status: 400,
                error: {
                    accountNumber: validation.errors.first("accountNumber"),
                    transactionId: validation.errors.first("transactionId"),
                }
            });
        }

    }
    validateAccountStatus(req,res,next){
        let accountNumber =req.params.accountNumber;
        const sql = `SELECT * FROM accounts WHERE accountnumber = ${accountNumber}`;
        newdb.query(sql).then((result) =>{
            console.log(result.rows);
            if(result.rows.length){
                if(result.rows[0].status === 'active'){
                    next();
                }else{
                    return res.status(403).send({
                        status: 403,
                        error: 'Transactions not allowed for a dormant account'
                    });
                }
            }else{
                return res.status(400).json({
                    status: 400,
                    error: `account '${accountNumber}' does not exists `,
                });
            }
        })
        
    }
}

const transactionValid = new TransactionValidation();
export default transactionValid;