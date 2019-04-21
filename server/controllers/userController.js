import db from "./../db/userDB";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import format from "biguint-format";
import newdb  from "./../db/db";
import bcrypt from "bcryptjs";

class UserController{
    // createUserNew(req,res){
    //     const{
    //         email,
    //         firstName,
    //         lastName,
    //         password,
    //     } = req.body;
    //     const type = "client";
    //     const sql1 =`SELECT * FROM users WHERE email='${email}'`;
        
    //     newdb.query(sql1).then((result) =>{
    //         console.log(result.rows);

    //         if (result.rows.length){
    //             return res.status(400).json({
    //                 status: 400,
    //                 error: `user with ${email} as email already exists`
    //             });
    //         }else{
    //             const token = jwt.sign({
    //                 email,
    //                 firstName
    //             },
    //                 'secret',
    //                 {
    //                     expiresIn: "1h",
    //                 }
    //             );
    //             const salt = 10;
    //             console.log(bcrypt.hashSync(password, parseInt(salt, 10)));
    //             const hashedPassord = bcrypt.hashSync(password, parseInt(salt, 10));
                

    //             const newUser = [
    //                 email,
    //                 firstName,
    //                 lastName,
    //                 hashedPassord,
    //                 type,
    //                 false
    //             ];
    //             const sql = "INSERT INTO users(email,firstName,lastName,password,type,isAdmin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
    //             newdb.query(sql, newUser).then((result) => {
    //                 console.log(result.rows);
    //                 res.status(201).json({
    //                     status: 201,
    //                     data: [
    //                         token,
    //                         firstName,
    //                         lastName,
    //                         email,
    //                         hashedPassord,
    //                         type,
    //                         false],
    //                 });
    //             })
    //         }

    //     });
    // }
    // signInNew(req,res){
    //     const {email,password} = req.body;
    //     const credentials = { email, password};

    //     const sql = `SELECT *FROM users WHERE email='${email}'`;
    //     newdb.query(sql).then((result)=>{
    //         if(result.rows.length){
    //             if (bcrypt.compareSync(password, result.rows[0].password)){
    //                 const token = jwt.sign({
    //                     email
    //                 },
    //                     'secret',
    //                     {
    //                         expiresIn: "1h",
    //                     }
    //                 );
                    
    //                 return res.status(200).json([{
    //                     token
    //                 }]);
    //             }else{
    //             res.status(400).json({
    //                 status: 400,
    //                 error: "Incorrect password",
    //             });
    //             }
    //         }else{
    //             res.status(400).json({
    //                 status: 400,
    //                 error: `user with ${email}  as an email does not exist`,
    //             });
    //         }
    //     })

    // }





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