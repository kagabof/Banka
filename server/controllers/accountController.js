import db from "./../db/accountDB";
import userdb from "./../db/userDB";

class AccountController{
    createAccount(req,res){
        const balance = parseFloat(req.body.balance);
        if(!balance || balance < 0){
            return res.status(400).send({
                status: 400,
                error: "the balance amount is required!",
            });

        }else if(!req.body.accountNumber){
            return res.status(400).send({
                status: 400,
                error: "account number is required!",
            });
        }else if(!req.body.owner){
            return res.status(400).send({
                status: 400,
                error: "owner required!",
            });
        }else if(!req.body.type){
            return res.status(400).send({
                status: 400,
                error: "type is required!",
            });
        }
        const account = {
            id: db.length + 1,
            accountNumber: req.body.accountNumber,
            createOn: Date.now(),
            owner: req.body.owner,
            type: req.body.type,
            status: "dormant",
            balance: req.body.balance,
        }

        db.push(account);
        return res.status(201).send({
            status: 201,
            data: account,
        });
    }
}

const acc = new AccountController();
 export default acc;