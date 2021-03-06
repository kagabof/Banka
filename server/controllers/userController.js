import jwt from "jsonwebtoken";
import newdb  from "./../db/db";
import bcrypt from "bcryptjs";

class UserController{
    deleteUser(req,res){
        const email = req.params.email;
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        newdb.query(sql).then((result) =>{
            if(result.rows.length){
                const sql = `DELETE FROM users WHERE email='${email}'`;
                newdb.query(sql).then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: `user with ${email} is deleted!`
                    });
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} does not exists!`
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
            if (result.rows.length) {
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists!`
                });
            } else {
                const salt = 10;
                const hashedPassord = bcrypt.hashSync(password.trim(), parseInt(salt, 10));


                const newUser = [
                    email.trim(),
                    firstName.trim(),
                    lastName.trim(),
                    hashedPassord,
                    type.trim(),
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
                            expiresIn: "30 days",
                        }
                    );
                    res.status(201).json({
                        status: 201,
                        data: {
                            token,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            type: type,
                            isAdmin: true
                        }
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

            if (result.rows.length) {
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists`
                });
            } else {

                const salt = 10;
                const hashedPassord = bcrypt.hashSync(password.trim(), parseInt(salt, 10));


                const newUser = [
                    email.trim(),
                    firstName.trim(),
                    lastName.trim(),
                    hashedPassord,
                    type.trim(),
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
                            expiresIn: "30 days",
                        }
                    );
                    res.status(201).json({
                        status: 201,
                        data: {
                            token,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            type: type,
                            isAdmin: false
                        }
                        
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
            if (Array.isArray(result.rows) && result.rows.length){
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists`
                });
            }else{
                
                const salt = 10;
                const hashedPassord = bcrypt.hashSync(password.trim(), parseInt(salt, 10));
                

                const newUser = [
                    email.trim(),
                    firstName.trim(),
                    lastName.trim(),
                    hashedPassord,
                    type.trim(),
                    false
                ];
                const sql = "INSERT INTO users(email,firstName,lastName,password,type,isAdmin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
                newdb.query(sql, newUser).then((result) => {
                    const tokenSend = {
                        emails: email.trim(),
                        isadmin: false,
                        type: type.trim(),
                    }
                    const token = jwt.sign(
                        tokenSend,
                        'secret',
                        {
                            expiresIn: "30 days",
                        }
                    );
                    res.status(201).json({
                        status: 201,
                        data: {
                            token,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            type: type,
                            isAdmin: false
                        }     
                    });
                })
            }

        });
    }
    signInNew(req,res){
        const {email,password} = req.body;

        const sql = `SELECT *FROM users WHERE email='${email}'`;
        newdb.query(sql).then((result)=>{
            if (Array.isArray(result.rows) && result.rows.length){
                const tokenSend= {
                    emails: result.rows[0].email,
                    isadmin: result.rows[0].isadmin,
                    type: result.rows[0].type,
                }
                if (bcrypt.compareSync(password, result.rows[0].password)){
                    const token = jwt.sign(
                        tokenSend,
                        'secret',
                        {
                            expiresIn: "30 days",
                        }
                    );
                    return res.status(200).json({
                        status: 200,
                        token,
                        data:{
                            
                            id: result.rows[0].id,
                            firstName: result.rows[0].firstname,
                            lastName: result.rows[0].lastname,
                            email: result.rows[0].email,
                        }
                        
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
    
}

const users = new UserController();
export default users;