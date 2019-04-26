import chai from  "chai";
import chaiHttp from "chai-http";
import app from "../app";
import newdb from "../db/db"

chai.use(chaiHttp);
chai.should();

let token = '';
let tokenSigninUser = '';
let tokenAdmin = '';

describe("Users", ()=>{
    describe("POST /", () => {
        it("should create a new user(client)", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    done();
                });
        });
        it("should not create a new user(client) with an incoresct last name.", (done) => {
            const user = {
                email: "agabo@gmail.com",
                firstName: "Kabeho",
                lastName: "",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    done();
                });
        });

        it("should not create a (client) with invalid email", (done) => {
            const user = {
                email: "kagabogmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    done();
                });
        });


        it("should create note create a new user(client) because of the existing email", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    done();
                });
        });
        
        it("should not signin (client) with non existing email", (done) => {
            const user = {
                email: "ddd@gmail.com",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    tokenSigninUser = res.body.token;
                    done();
                });
        });
        it("should not signin (client) with a bad email", (done) => {
            const user = {
                email: "kagabogmail.com",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    tokenSigninUser = res.body.token;
                    done();
                });
        });
        it("should should not signin (client)", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                password: "Fosaad@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    tokenSigninUser = res.body.token;
                    done();
                });
        });
        /*admin log in*/
        it("should signin as admin", (done) => {
            const user = {
                email: "faustinkagabo@gmail.com",
                password: "Fofo1995"
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    tokenAdmin = res.body.token;
                    done();
                });
        });

        it("should create a new user(staff)", (done) => {
            const user = {
                email: "kagaboa@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup/staff`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    done();
                });
        });
        it("should not create a new user(staff) with the same email", (done) => {
            const user = {
                email: "kagaboa@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup/staff`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    done();
                });
        });
        it("should create a new user(admin)", (done) => {
            const user = {
                email: "kagaboad@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup/admin`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    done();
                });
        });
        it("should create not create a new user(admin)", (done) => {
            const user = {
                email: "kagaboad@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup/admin`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    token = res.body.token;
                    res.body.should.have.property("status").eql(400);
                    res.body.should.have.property("error").eql(`user with ${user.email} as email already exists!`);
                    done();
                });
        });

    });
});  

/*account test*/
describe("Account", () => {
    describe("POST /", () => {
        it("should signin (client)", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                password: "Fofo@1D",
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    tokenSigninUser = res.body.token;

                    done();
                });
        });
        it("create an account", (done) => {
            const user = {
                type: "saving",
            }
            chai.request(app)
                .post('/api/v2/accounts')
                .set('Authorization', "Bearer " + tokenSigninUser)
                .send(user)
                .end((req, res) => {
                    
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.an('object');
                    done();
                });
        });
        it("create an account", (done) => {
            const user = {
                type: "saving",
            }
            chai.request(app)
                .post('/api/v2/accounts')
                .set('Authorization', "Bearer " + tokenSigninUser)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.an('object');
                    done();
                });
        });

        it("should not create an account with a bad token", (done) => {
            const user = {
                type: "saving",
            }
            chai.request(app)
                .post('/api/v2/accounts')
                .set('Authorization', "Bearer " + "tokenSigninUser")
                .send(user)
                .end((req, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });
        /*admin log in*/
        it("should signin as admin", (done) => {
            const user = {
                email: "faustinkagabo@gmail.com",
                password: "Fofo1995"
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    tokenAdmin = res.body.token;
                    done();
                });
        });
/*post transactions*/
        it('transaction not allowed for a dormant account credit account', (done) => {
            let email = "kagabo@gmail.com";
            const data ={
                amount:2000,
            }
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    chai.request(app)
                        .post(`/api/v2/transactions/${result.rows[0].accountnumber}/credit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(data)
                        .end((req, res) => {
                            
                            res.should.have.status(403);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });
        it('can not credit account', (done) => {
            const data = {
                amount: 2000,
            }
                    chai.request(app)
                        .post(`/api/v2/transactions/3/credit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(data)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
                
        });
        it('can not credit account with no amount', (done) => {
            
            chai.request(app)
                .post(`/api/v2/transactions/3/credit`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });

        });
    });
    describe('PATCH /', () => {
        it('activate the account', (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    
                    chai.request(app)
                        .patch(`/api/v2/account/${result.rows[0].accountnumber}`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });
        it('deactivated the account', (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    
                    chai.request(app)
                        .patch(`/api/v2/account/${result.rows[0].accountnumber}`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });
            });
        });

        it('should not activate or deactivate the account', (done) => {
                    chai.request(app)
                        .patch(`/api/v2/account/12`)
                        .set('Authorization', "Bearer " + "tokenAdmin")
                        .end((req, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('object');
                            done();
                        });
                });
        it('should not activate or deactivate the account', (done) => {
            chai.request(app)
                .patch(`/api/v2/account/12`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        /*debiting transactions*/

        it('debit account', (done) => {
            let email = "kagabo@gmail.com";
            const data = {
                amount: 2000,
            }
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    
                    chai.request(app)
                        .post(`/api/v2/transactions/${result.rows[0].accountnumber}/debit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(data)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });
        it('can not debit account', (done) => {
            const data = {
                amount: 2000,
            }
            chai.request(app)
                .post(`/api/v2/transactions/3/debit`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(data)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });

        });
        it('can not credit account with no amount', (done) => {

            chai.request(app)
                .post(`/api/v2/transactions/3/debit`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });

        });
        
        
    });
    describe('PATCH /', () => {
        it('activate the account', (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    
                    chai.request(app)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });
        it('deactivated the account', (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    chai.request(app)
                        .patch(`/api/v2/account/${result.rows[0].accountnumber}`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });

        it('should not activate or deactivate the account', (done) => {
            chai.request(app)
                .patch(`/api/v2/account/12`)
                .set('Authorization', "Bearer " + "tokenAdmin")
                .end((req, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not activate or deactivate the account', (done) => {
            chai.request(app)
                .patch(`/api/v2/account/12`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
           
    });

/*get all about account tests*/
    describe("GET /", () => {
        it("should get all account", (done) => {
            chai.request(app)
                .get('/api/v2/accounts')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should get all account with dormant status", (done) => {
            chai.request(app)
                .get('/api/v2/accounts?status=dormant')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should get all account with active status", (done) => {
            let status = "active";
            chai.request(app)
                .get('/api/v2/accounts?status=active')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                            res.should.have.a.status(200);
                            res.body.should.be.a('object');
                            done();
                    
                });
        });
        it("should get all not account with active status", (done) => {
            chai.request(app)
                .get('/api/v2/accounts?status=acti')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should get all account of a user", (done) => {
            chai.request(app)
                .get('/api/v2/user/kagabo@gmail.com/accounts')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should get all not account of a user", (done) => {
            chai.request(app)
                .get('/api/v2/user/kagabogmail.com/accounts')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should get all not account of a user an known email", (done) => {
            chai.request(app)
                .get('/api/v2/user/qq@gmail.com/accounts')
                .set('Authorization', "Bearer " + "tokenAdmin")
                .end((req, res) => {
                    res.should.have.a.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should get account details', (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    chai.request(app)
                        .get(`/api/v2/account/${result.rows[0].accountnumber}`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });
        it("should not get account details with a bad account number", (done) => {
            chai.request(app)
                .get(`/api/v2/account/12`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

/*transactions*/
        it('will not get all transactions with bad token ', (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    chai.request(app)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });
            it('get a specific transaction with id', (done) => {
                let email = "kagabo@gmail.com";
                const sql = `SELECT * FROM users WHERE email='${email}'`;
                newdb.query(sql).then((result) => {
                    const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                    newdb.query(sql1).then((result) => {
                        const sql2 = `SELECT * FROM transactions WHERE id = '${result.rows[0].id}'`;
                        newdb.query(sql2).then((result) => {
                            chai.request(app)
                                .get(`/api/v2/accounts/${result.rows[0].accountnumber}/transactions/1`)
                                .set('Authorization', "Bearer " + tokenAdmin)
                                .end((req, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    done();
                                });
                        });
                        
                    });

                });
            });
            it('should not get a specific transaction bad account number and id', (done) => {
                chai.request(app)
                    .get(`/api/v2/accounts/sd/transactions/fd`)
                    .set('Authorization', "Bearer " + tokenAdmin)
                    .end((req, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                                    done();
                    });
                        
            });
            it('should not get a specific transaction with incorect token', (done) => {
                chai.request(app)
                    .get(`/api/v2/accounts/sd/transactions/fd`)
                    .set('Authorization', "Bearer " + "tokenAdmin")
                    .end((req, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a('object');
                        done();
                    });

            });
            it('should not get a specific transaction with incorect account number', (done) => {
                chai.request(app)
                    .get(`/api/v2/accounts/1111111/transactions/1`)
                    .set('Authorization', "Bearer " + tokenAdmin)
                    .end((req, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });

            });
            it('get a specific transaction with id', (done) => {
                
                            chai.request(app)
                                .get(`/api/v2/accounts/123/transactions/11111111`)
                                .set('Authorization', "Bearer " + tokenAdmin)
                                .end((req, res) => {
                                    res.should.have.status(400);
                                    res.body.should.be.a('object');
                                    done();
                                });
                    
            });
        it('can not get all transactions with a rong account', (done) => {
            
                    chai.request(app)
                        .get(`/api/v2/accounts/4/transactions`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
                
        });
        
    });
/*delete account*/
    describe("DELETE /", () => {
        it("delete an account", (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result)=>{
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    
                    const account = result.rows[0].accountnumber;
                    
                    chai.request(app)
                        .delete(`/api/v2/accounts/${account}`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });
                
            });
           
            
        });

        it("can not delete with rong account", (done) => {
            
                    chai.request(app)
                        .delete(`/api/v2/accounts/22`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
                });

    });

});




describe("Users delete", () => {
    describe("DELETE /", () => {
        it("delete the user", (done) => {
            const user = {
                email: "faustinkagabo@gmail.com",
            };
            chai.request(app)
                .delete(`/api/v2/auth/kagabo@gmail.com/delete`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("delete the staff", (done) => {
            const user = {
                email: "kagaboa@gmail.com",
            };
            chai.request(app)
                .delete(`/api/v2/auth/${user.email}/delete`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("delete the admin", (done) => {
            const user = {
                email: "kagaboad@gmail.com",
            };
            chai.request(app)
                .delete(`/api/v2/auth/${user.email}/delete`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("delete the admin", (done) => {
            const user = {
                email: "kag@gmail.com",
            };
            chai.request(app)
                .delete(`/api/v2/auth/${user.email}/delete`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});


