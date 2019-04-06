import db from "./../db/accountDB";
import userdb from "./../db/userDB";

class AccountController{
    createAccount(req,res){
        const userId = parseFloat(req.body.owner);
        let userIndex;
        let userFind;

        userdb.map((user, index)=>{
            if(user.id === userId){
                userFind = user;
                userIndex = index;
            }
        })

        if(!userFind){
            return res.status(400).send({
                status: 400,
                error: "owner not found!",
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
            owner: userId,
            type: req.body.type,
            status: "dormant",
            balance: 0,
        }


        db.push(account);
        return res.status(201).send({
            status: 201,
            data: {
                accountNumber: req.body.accountNumber,
                firstName: userFind.firstName,
                lastName: userFind.lastName,
                email: userFind.email,
                type: req.body.type,
            }
        });
    }
}

const acc = new AccountController();
 export default acc;