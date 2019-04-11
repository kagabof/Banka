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

    activateDeactivateAccount(req, res) {
        const userId = parseInt(req.body.id);
        const accountNumber = parseInt(req.body.accountNumber);
        const user = userdb.find(user => user.id === userId);
        const account = db.find(account => account.accountNumber === accountNumber);
        
        let accountFound;
        let accountIndex;

        db.map((account, index) => {
            if(account.accountNumber === accountNumber){
                accountFound = account;
                accountIndex = index;
            }
            
        });
        if(!user){
            return res.status(400).send({
                status: 400,
                error: 'user not found',
            });
        }else if(user.isAdmin !== true){
            return res.status(400).send({
                status: 400,
                error: 'user is not admin to deactivate or activate the account',
            });
        }else if(!account) {
            return res.status(400).send({
                status: 400,
                error: 'account not found',
            });
        } else if(account.status === "active") {
            const newAccount = {
                id: account.id,
                accountNumber: account.accountNumber,
                createOn: account.createOn,
                owner: account.owner,
                type: accountFound.type,
                status: "dormant",
                balance: account.balance
            };
            db.splice(accountIndex,1,newAccount);
            const account1 = db.find(account => account.accountNumber === accountNumber);
            return res.status(201).send({
                status: 201,
                data: {
                    accountNumber: account1.accountNumber,
                    status: account1.status
                } 
            });
        }else{
            const newAccount = {
                id: account.id,
                accountNumber: account.accountNumber,
                createOn: account.createOn,
                owner: account.owner,
                type: account.type,
                status: "active",
                balance: account.balance,
            };
            db.splice(accountIndex, 1 , newAccount);
            const account1 = db.find(account => account.accountNumber === accountNumber);
            
            return res.status(201).send({
                status: 201,
                data: {
                    accountNumber: account1.accountNumber,
                    accountStatus: account1.status,
                } 
            });
        }

    }
    accountDelete(req, res) {
        
        const accountNumber = parseInt(req.params.id);
        let accountFound;
        let accountIndex;

        db.map((account, index) => {
            if (account.accountNumber === accountNumber) {
                accountFound = account;
                accountIndex = index;
            }
        });

        if (!accountFound) {
            return res.status(400).send({
                status: 400,
                error: "account not found",
            });
        } else {
            db.splice(accountIndex, 1);
            return res.status(202).send({
                status: 202,
                message: 'Account successfully deleted',
                date: accountFound
            });
        }

    }
    findAllAccounts(req,res){
        return res.status(200).send({
            status: 200,
            data: db
        });
    }

    // findAnAccount(req,res){

    //     const accountNumber = parseInt(req.params.id);
    //     let accountFound;
    //     let accountIndex;

    //     db.map((account, index) => {
    //         if (account.accountNumber === accountNumber) {
    //             accountFound = account;
    //             accountIndex = index;
    //         }
    //     });

    //     if (!accountFound) {
    //         return res.status(400).send({
    //             status: 400,
    //             error: "account not found",
    //         });
    //     } else {
    //         return res.status(200).send({
    //             status: 200,
    //             message: 'Account successfully found',
    //             date: accountFound
    //         });
    //     }
    // }
}

const acc = new AccountController();
 export default acc;