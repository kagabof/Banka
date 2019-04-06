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
                balance: account.balance,
            },
        });
    }
    activateAccount(req, res) {
        const userId = parseInt(req.body.id);
        const accountNumber = parseInt(req.body.accountNumber);
        let accountFound;
        let accountIndex;

        let userIndex;
        let userFound;

        userdb.map((user, index) => {
            if (user.id === userId) {
                userIndex = index;
                userFound = user;
            }
        });

        db.map((account, index) => {
            if(account.accountNumber === accountNumber){
                accountFound = account;
                accountIndex = index;
            }
            
        });
        if(!userFound){
            return res.status(400).send({
                status: 400,
                error: 'user not found',
            });
        }else if(userFound.isAdmin !== true){
            return res.status(400).send({
                status: 400,
                error: 'user is not admin to activate the account',
            });
        }else if(!accountFound) {
            return res.status(400).send({
                status: 400,
                error: 'account not found',
            });
        }else if(accountFound.status === "active"){
            return res.status(400).send({
                status: 400,
                error: 'account is already actived!',
            });
        } else {
            const newAccount = {
                id: accountFound.id,
                accountNumber: accountFound.accountNumber,
                createOn: accountFound.createOn,
                owner: accountFound.owner,
                type: accountFound.type,
                status: "active",
                balance: accountFound.balance,
            }
            db.splice(accountIndex, 1 , newAccount);
            return res.status(201).send({
                status: 201,
                data: db,
            })
        }

    }
   
}

const acc = new AccountController();
 export default acc;