import db from "./../db/userDB";
//import random from "randomstring"
class UserController{
    createUser(req,res){
        if (!req.body.email) {
            return res.status(400).send({
                status: 400,
                error: "email is required",
            });
        } else if(!req.body.firstName) {
            return res.status(400).send({
                status: 400,
                error: "first name is required",
            });
        } else if(!req.body.lastName) {
            return res.status(400).send({
                status: 400,
                error: "last name is required",
            })
        } else if(!req.body.password) {
            return res.status(400).send({
                status: 400,
                error: "password is required",
            });
        }
        const user = {
            id: db.length + 1,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            type: "client",
            isAdmin: false,
        };

        db.push(user);
        return res.status(201).send({
            status: 201,
            data: user,
        });
    }

    signIn(req,res){
        const user =db.find(user => user.email === req.body.email && user.password === req.body.password);
        if(user){
            return res.status(201).send({
                status: 201,
                data: {
                    //token: random.generate(),
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },

            });
        }
        else{
            return res.status(400).send({
                status:400,
                error: "the user does note exist",
            });
        }
    }
}

const users = new UserController();
export default users;