import db from "./../db/userDB";

import jwt from "jsonwebtoken";
import crypto from "crypto";
import format from "biguint-format";
import Validator from "validatorjs";




class UserController{
    getAllUsers(req,res){
        return res.status(200).send({
            status: 200,
            data: db,
        });
    }
    createUser(req,res){
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        const rules = {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email',
            password: 'required'
        };
        const validation = new Validator(data, rules);

        if(validation.passes()){
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
                status: 201,
                data: user,
            });
        }else{
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

    signIn(req,res){
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        const rules = {
            email: 'required|email',
            password: 'required'
        }

        const validation = new Validator(data, rules);
        if(validation.passes()){
            const user = db.find(user => user.email === data.email && user.password === data.password);
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
                    error: "the user does note exist, should first signup",
                });
            }
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

    
}

const users = new UserController();
export default users;