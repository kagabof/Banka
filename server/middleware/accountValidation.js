import Validator from "validatorjs";

class AccountValidation{
    createAccountValidation(req,res,next){
        const data = {
            email: req.body.email,
            type: req.body.type
        };

        const rules = {
            email: 'required|email',
            type: 'required|string',
        }
        const validation = new Validator(data, rules);
        if (validation.passes()) {
            next();
        } else {
            return res.status(400).send({
                status: 400,
                error: {
                    owner: validation.errors.first("email"),
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
    validateEmail(req, res, next) {
        const data = {
            email: req.params.email,
        };
        const rules = {
            email: 'required|email'
        };
        const validation = new Validator(data, rules);

        if (validation.passes()) {
            next();
        } else {
            return res.status(400).send({
                status: 400,
                error: {
                    email: validation.errors.first("email"),
                }
            });
        }

    }
}

const accountValid = new AccountValidation();
export default accountValid;
