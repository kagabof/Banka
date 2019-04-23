import db from "./../db/userDB";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import format from "biguint-format";
import newdb  from "./../db/db";
import bcrypt from "bcryptjs";

class UserController{
    deleteUser(req,res){
        const email = req.params.email;
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        newdb.query(sql).then((result) =>{
            console.log(result.rows);
            if(result.rows.length){
                const sql = `DELETE FROM users WHERE email='${email}'`;
                newdb.query(sql).then((result) => {
                    console.log(result.rows);
                    return res.status(200).json({
                        status: 200,
                        data: [result.rows]
                    });
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email does not exists`
                });
            }
        })
        
    }
    createAdminNew(req, res) {
        const {
            email,
            firstName,
            lastName,
            password,
        } = req.body;
        const type = "staff";
        const sql1 = `SELECT * FROM users WHERE email='${email}'`;

        newdb.query(sql1).then((result) => {
            console.log(result.rows);
            if (result.rows.length) {
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists!`
                });
            } else {
                const salt = 10;
                console.log(bcrypt.hashSync(password, parseInt(salt, 10)));
                const hashedPassord = bcrypt.hashSync(password, parseInt(salt, 10));


                const newUser = [
                    email,
                    firstName,
                    lastName,
                    hashedPassord,
                    type,
                    true
                ];
                const sql = "INSERT INTO users(email,firstName,lastName,password,type,isAdmin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
                newdb.query(sql, newUser).then((result) => {
                    const tokenSend = {
                        emails: result.rows[0].email,
                        isadmin: result.rows[0].isadmin,
                        type: result.rows[0].type,
                    }
                    const token = jwt.sign(
                        tokenSend,
                        'secret',
                        {
                            expiresIn: "1h",
                        }
                    );
                    console.log(result.rows);
                    res.status(201).json({
                        status: 201,
                        data: [
                            {token},
                            {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                type: type,
                                isAdmin: true
                            }
                        ],
                    });
                })
            }

        });
    }
    createStaffNew(req, res) {
        const {
            email,
            firstName,
            lastName,
            password,
        } = req.body;
        const type = "staff";
        const sql1 = `SELECT * FROM users WHERE email='${email}'`;

        newdb.query(sql1).then((result) => {
            console.log(result.rows);

            if (result.rows.length) {
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists`
                });
            } else {

                const salt = 10;
                console.log(bcrypt.hashSync(password, parseInt(salt, 10)));
                const hashedPassord = bcrypt.hashSync(password, parseInt(salt, 10));


                const newUser = [
                    email,
                    firstName,
                    lastName,
                    hashedPassord,
                    type,
                    false
                ];
                const sql = "INSERT INTO users(email,firstName,lastName,password,type,isAdmin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
                newdb.query(sql, newUser).then((result) => {
                    const tokenSend = {
                        emails: result.rows[0].email,
                        isadmin: result.rows[0].isadmin,
                        type: result.rows[0].type,
                    }
                    const token = jwt.sign(
                        tokenSend,
                        'secret',
                        {
                            expiresIn: "1h",
                        }
                    );
                    console.log(result.rows);
                    res.status(201).json({
                        status: 201,
                        data: [
                            { token },
                            {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                type: type,
                                isAdmin: false
                            }
                        ],
                    });
                })
            }

        });
    }
    createClientNew(req,res){
        const{
            email,
            firstName,
            lastName,
            password,
        } = req.body;
        const type = "client";
        const sql1 =`SELECT * FROM users WHERE email='${email}'`;
        
        newdb.query(sql1).then((result) =>{
            console.log(result.rows);

            if (result.rows.length){
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists`
                });
            }else{
                
                const salt = 10;
                console.log(bcrypt.hashSync(password, parseInt(salt, 10)));
                const hashedPassord = bcrypt.hashSync(password, parseInt(salt, 10));
                

                const newUser = [
                    email,
                    firstName,
                    lastName,
                    hashedPassord,
                    type,
                    false
                ];
                const sql = "INSERT INTO users(email,firstName,lastName,password,type,isAdmin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
                newdb.query(sql, newUser).then((result) => {
                    const tokenSend = {
                        emails: result.rows[0].email,
                        isadmin: result.rows[0].isadmin,
                        type: result.rows[0].type,
                    }
                    const token = jwt.sign(
                        tokenSend,
                        'secret',
                        {
                            expiresIn: "1h",
                        }
                    );
                    console.log(result.rows);
                    res.status(201).json({
                        status: 201,
                        data: [
                            { token },
                            {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                type: type,
                                isAdmin: false
                            }
                        ],
                    });
                })
            }

        });
    }
    signInNew(req,res){
        const {email,password} = req.body;
        const credentials = { email, password};

        const sql = `SELECT *FROM users WHERE email='${email}'`;
        newdb.query(sql).then((result)=>{
            if(result.rows.length){
                const tokenSend= {
                    emails: result.rows[0].email,
                    isadmin: result.rows[0].isadmin,
                    type: result.rows[0].type,
                }
                console.log(tokenSend);
                if (bcrypt.compareSync(password, result.rows[0].password)){
                    const token = jwt.sign(
                        tokenSend,
                        'secret',
                        {
                            expiresIn: "1h",
                        }
                    );
                    return res.status(200).json({
                        token
                    });
                }else{
                res.status(400).json({
                    status: 400,
                    error: "Incorrect password",
                });
                }
            }else{
                res.status(400).json({
                    status: 400,
                    error: `user with ${email}  as an email does not exist`,
                });
            }
        })

    }





    getAllUsers(req,res){
        return res.status(200).send({
            status: 200,
            data: db,
        });
    }
    
}

const users = new UserController();
export default users;