import db from "./../db/userDB";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import format from "biguint-format";

class UserController{
    getAllUsers(req,res){
        return res.status(200).send({
            status: 200,
            data: db,
        });
    }
    createUser(req,res){
        

        const token = jwt.sign({
            email: req.body.email,
            firstName: req.body.firstName,
        },
            'secret',
            {
                expiresIn: "1h",
            });

            const random = (qty) => {
                return crypto.randomBytes(qty)
            }
            const user = {
                id: parseInt(format(random(4), 'dec')),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                type: "client",
                isAdmin: false,
            };
            db.push(user);
            return res.status(201).send({
                token,
                status: 201,
                data: user,
            });
    }

    signIn(req,res){
            const user = db.find(user => user.email === req.body.email && user.password === req.body.password);
            if (user) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                    'secret',
                    {
                        expiresIn: "1h",
                    });
                return res.status(202).send({
                    status: 202,
                    data: {
                        token: token,
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    },
                });
            }
            else {
                return res.status(401).send({
                    status: 401,
                    error: "The user does note exist, he/she should first signup!",
                });
            }
    }

    
}

const users = new UserController();
export default users;