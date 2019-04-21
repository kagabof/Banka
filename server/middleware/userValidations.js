import Validator from "validatorjs";

class UserValidation{
    signInValidation(req,res,next){
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        const rules = {
            email: 'required|email',
            password: 'required|string'
        }

        const validation = new Validator(data, rules);
        if (validation.passes()) {
            next();
        }else{
            return res.status(406).send({
                status: 406,
                error: {
                    email: validation.errors.first("email"),
                    password: validation.errors.first("password")
                },
            });
        }
    }
    createUserValidation(req,res,next){
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        const rules = {
            firstName: 'required|string',
            lastName: 'required|string',
            email: 'required|email',
            password: 'required|string'
        };
        const validation = new Validator(data, rules);
        if (validation.passes()) {
            next();
        } else {
            return res.status(417).send({
                status: 417,
                error: {
                    firstName: validation.errors.first('firstName'),
                    lastName: validation.errors.first('lastName'),
                    email: validation.errors.first('email'),
                    password: validation.errors.first('name')
                }
            });
        }
    }
}

const valid = new UserValidation();

export default valid;