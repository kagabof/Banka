import Validator from "validatorjs";

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
                    cachierId: validation.errors.first("cachierId"),
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
}

const transactionValid = new TransactionValidation();
export default transactionValid;