import Validator from "validatorjs";

class AccountValidation{
    createAccountValidation(req,res,next){
        const data = {
            owner: req.body.owner,
            type: req.body.type
        };

        const rules = {
            owner: 'required|integer',
            type: 'required|string',
        }
        const validation = new Validator(data, rules);
        if (validation.passes()) {
            next();
        } else {
            return res.status(400).send({
                status: 400,
                error: {
                    owner: validation.errors.first("owner"),
                    type: validation.errors.first("type")
                }
            });
        }
    }
    validateAccountNumber(req, res,next) {
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

const accountValid = new AccountValidation();
export default accountValid;
