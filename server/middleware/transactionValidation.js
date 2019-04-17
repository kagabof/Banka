import Validator from "validatorjs";

class TransactionValidation{
    debiteCreaditAccountValidation(req, res,next){
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
            next();
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
}

const transactionValid = new TransactionValidation();
export default transactionValid;