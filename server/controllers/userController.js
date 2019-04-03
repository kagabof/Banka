import db from "./../db/userDB";

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
}

const users = new UserController();
export default users;