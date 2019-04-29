import chai from  "chai";
import chaiHttp from "chai-http";
import app from "../app";
import newdb from "../db/db"

chai.use(chaiHttp);
chai.should();
let clientToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbHMiOiJjbGllbnRAZ21haWwuY29tIiwiaXNhZG1pbiI6ZmFsc2UsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE1NTY0MDU0NzQsImV4cCI6MTU1ODk5NzQ3NH0.-V8Mrzat-SSpKdJ4V-EuNsQIbdHvdgqA9ehVAXd3hP8';
let staffToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbHMiOiJzdGFmZkBnYW1pbC5jb20iLCJpc2FkbWluIjpmYWxzZSwidHlwZSI6InN0YWZmIiwiaWF0IjoxNTU2NDAzMjgxLCJleHAiOjE1NTg5OTUyODF9.iuozinz75tQVSmgqpK7sHDqpiwGoj2Wb42U3TFajcYU';
let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbHMiOiJhZG1pbkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJ0eXBlIjoic3RhZmYiLCJpYXQiOjE1NTY0MDM1MDEsImV4cCI6MTU1ODk5NTUwMX0.iFtCVru8_GSB_n3Q-MOETpIHL7EvLLX7NTsyk3y11Ss';

let transId;
let tokencl = '';
let token = '';
let tokenSigninUser = '';
let tokenAdmin = '';
let acc ='';
let acc2;
let acc3;

describe("Users", ()=>{
    describe("POST /", () => {
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
        it("should not get any account", (done) => {
            chai.request(app)
                .get('/api/v2/accounts?status=dorm')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should get all account with dormant status", (done) => {
            chai.request(app)
                .get('/api/v2/accounts?status=dormant')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not get any active account", (done) => {
            chai.request(app)
                .get('/api/v2/accounts?status=active')
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not find any account", (done) => {
            chai.request(app)
                .get(`/api/v2/accounts`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
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

        it("should create client 6", (done) => {
            const user = {
                email: "loic@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "Loic1@",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    //token = res.body.token;
                    done();
                });
        });
        it("should not create client 6", (done) => {
            const user = {
                email: "loic@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "Loic1",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    //token = res.body.token;
                    done();
                });
        });
       

        it("should create  a new user(client)", (done) => {
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
        it("should create  a new user(client2)", (done) => {
            const user = {
                email: "client@gmail.com",
                firstName: "client",
                lastName: "client",
                password: "Client1@",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    tokencl = res.body.token;
                    done();
                });
        });
        it("should not create  a new user(client2) some user", (done) => {
            const user = {
                email: "client@gmail.com",
                firstName: "client",
                lastName: "client",
                password: "Client1@",
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
        it("should signin (admin)", (done) => {
            const user = {
                email: "client@gmail.com",
                password: "Client1@",
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
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

        it("should not create a new user(staff) bad token", (done) => {
            const user = {
                email: "kagaboa@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup/staff`)
                .set('Authorization', "Bearer " + clientToken)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
        it("should not create a new user(staff) bad token", (done) => {
            const user = {
                email: "kagaboa@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v2/auth/signup/staff`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(403);
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
        it("should not  create an account with no type", (done) => {
            const user = {
                type: "saving",
            }
            chai.request(app)
                .post('/api/v2/accounts')
                .set('Authorization', "Bearer " + tokenSigninUser)
                .end((req, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it("should not create an account", (done) => {
            const user = {
                type: "saving",
            }
            chai.request(app)
                .post('/api/v2/accounts')
                .send(user)
                .end((req, res) => {

                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("create an account2", (done) => {
            const user = {
                type: "saving",
            }
            chai.request(app)
                .post('/api/v2/accounts')
                .set('Authorization', "Bearer " + clientToken)
                .send(user)
                .end((req, res) => {

                    res.should.have.status(201);
                    acc2 = res.body.data.accountNumber
                    acc = res.body.data.accountNumber;
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.an('object');
                    done();
                });
        });
        it("create an account2", (done) => {
            const user = {
                type: "saving",
            }
            chai.request(app)
                .post('/api/v2/accounts')
                .set('Authorization', "Bearer " + clientToken)
                .send(user)
                .end((req, res) => {

                    res.should.have.status(201);
                    acc3 = res.body.data.accountNumber
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

        it("should find account details", (done) => {
            
            
            chai.request(app)
                .get(`/api/v2/account/${acc}`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("activate", (done) => {
            chai.request(app)
                .patch(`/api/v2/account/${acc2}`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("activate", (done) => {

            chai.request(app)
                .patch(`/api/v2/account/12345f78`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("get all active account", (done) => {

            chai.request(app)
                .get(`/api/v2/accounts?status=active`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not find all any transaction", (done) => {
            chai.request(app)
                .get(`/api/v2/accounts/${acc}/transactions`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not find all any transaction", (done) => {
            chai.request(app)
                .get(`/api/v2/accounts/1ff/transactions`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not find all any transaction", (done) => {
            chai.request(app)
                .get(`/api/v2/accounts/${acc}/transactions/1`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("credit account", (done) => {
            const amount = {
                amount: 20000
            }
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/credit`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(amount)
                .end((req, res) => {
                    transId = res.body.data[0].id; 
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("debit account", (done) => {
            const amount = {
                amount: 200
            }
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/debit`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(amount)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('get all transaction for an account', (done) => {
            
                    chai.request(app)
                        .get(`/api/v2/accounts/${acc}/transactions`)
                        .set('Authorization', "Bearer " + clientToken)
                        .end((req, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
              
        });
        it("should not debit account", (done) => {
            const amount = {
                amount: 20000
            }
            chai.request(app)
                .post(`/api/v2/transactions/201342/debit`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(amount)
                .end((req, res) => {
                    
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not find all any transaction", (done) => {
            chai.request(app)
                .get(`/api/v2/accounts/${acc}/transactions/40000`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should find a transaction", (done) => {
            chai.request(app)
                .get(`/api/v2/accounts/${acc}/transactions/${transId}`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should find all any transaction", (done) => {
            chai.request(app)
                .get(`/api/v2/accounts/${acc}/transactions`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("sould not credit account with bad account number", (done) => {
            const amount = {
                amount: 20000
            }
            chai.request(app)
                .post(`/api/v2/transactions/21000000/credit`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(amount)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it("find all account", (done) => {
            chai.request(app)
                .get(`/api/v2/user/loic@gmail.com/accounts`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("find all account", (done) => {

            chai.request(app)
                .get(`/api/v2/user/loic@gmail.com/accounts`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("find all account", (done) => {

            chai.request(app)
                .get(`/api/v2/user/loic@gmail.com/accounts`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("find account of a user", (done) => {

            chai.request(app)
                .get(`/api/v2/user/client@gmail.com/accounts`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("find account of a user", (done) => {

            chai.request(app)
                .get(`/api/v2/user/clien@gmail.com/accounts`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
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
        it('activated the account', (done) => {
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

        it('can not debit with bad token', (done) => {
            const data = {
                amount: 2000,
            }
            chai.request(app)
                .post(`/api/v2/transactions/3/debit`)
                .send(data)
                .end((req, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });

        });

        it('can not debit with bad token', (done) => {
            const data = {
                amount: 2000,
            }
            chai.request(app)
                .post(`/api/v2/transactions/3/debit`)
                .set('Authorization', "Bearer " + clientToken)
                .send(data)
                .end((req, res) => {
                    res.should.have.status(403);
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
        it('get all account details', (done) => {
            let email = "kagabo@gmail.com";
            const sql = `SELECT * FROM users WHERE email='${email}'`;
            newdb.query(sql).then((result) => {
                const sql1 = `SELECT * FROM accounts WHERE owner = '${result.rows[0].id}'`;
                newdb.query(sql1).then((result) => {
                    chai.request(app)
                        .patch(`/api/v2/account/${result.rows[0].accountnumber}`)
                        .set('Authorization', "Bearer " + tokencl)
                        .end((req, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('object');
                            done();
                        });
                });

            });
        });
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
            
        it('credit', (done) => {
            const amount ={
                amount: 2000
            }
            let account ="";
            let status = "active";
            const sql = `SELECT *FROM accounts WHERE status = 'active'`;
            newdb.query(sql).then((result) =>{
                
                    account = result.rows[0].accountnumber;
                    chai.request(app)
                        .post(`/api/v2/transactions/${account}/credit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(amount)
                        .end((req, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
            });

            

        });
        
        it('should not credit with negative amount', (done) => {
            const amount = {
                amount: -2000
            }
            let account = "";
            let status = "active";
            const sql = `SELECT *FROM accounts WHERE status = 'active'`;
            newdb.query(sql).then((result) => {
                
                    account = result.rows[0].accountnumber;
                    chai.request(app)
                        .post(`/api/v2/transactions/${account}/credit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(amount)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
            });
        });
        it('should not credit with bad amount', (done) => {
            const amount = {
                amount: "lel"
            }
            let account = "";
            let status = "active";
            const sql = `SELECT *FROM accounts WHERE status = 'active'`;
            newdb.query(sql).then((result) => {
                
                    account = result.rows[0].accountnumber;
                    chai.request(app)
                        .post(`/api/v2/transactions/${account}/credit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(amount)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
            });
        });
        
        it('should not debit with a negative amount debit', (done) => {
            const amount = {
                amount: -5
            }
            let account = "";
            let status = "active";
            const sql = `SELECT *FROM accounts WHERE status = 'active'`;
            newdb.query(sql).then((result) => {
                
                    account = result.rows[0].accountnumber;
                    chai.request(app)
                        .post(`/api/v2/transactions/${account}/debit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(amount)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
                
            });
        });
        it('amount is big than the balance', (done) => {
            const amount = {
                amount: 999999999
            }
            let account = "";
            let status = "active";
            const sql = `SELECT *FROM accounts WHERE status = 'active'`;
            newdb.query(sql).then((result) => {
                
                    account = result.rows[0].accountnumber;
                    chai.request(app)
                        .post(`/api/v2/transactions/${account}/debit`)
                        .set('Authorization', "Bearer " + tokenAdmin)
                        .send(amount)
                        .end((req, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        });
               
            });
        });
        
        
        it('get all transaction for an account', (done) => {
                    chai.request(app)
                        .get(`/api/v2/accounts/${acc}/transactions`)
                        .set('Authorization', "Bearer " + tokenSigninUser)
                        .end((req, res) => {
                            res.should.have.status(403);
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
        it("deactivate", (done) => {
            chai.request(app)
                .patch(`/api/v2/account/${acc2}`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("deactivate2", (done) => {
            

            chai.request(app)
                .patch(`/api/v2/account/${acc3}`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .end((req, res) => {
                    res.should.have.status(200);
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
        it("can not delete with rong account", (done) => {

            chai.request(app)
                .delete(`/api/v2/accounts/22`)
                .set('Authorization', "Bearer " + clientToken)
                .end((req, res) => {
                    res.should.have.status(403);
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
        it("delete the client", (done) => {
            const user = {
                email: "client@gmail.com",
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
        it("delete the client loic", (done) => {
            const user = {
                email: "loic@gmail.com",
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
        it("should not delete the account of loic", (done) => {
            const user = {
                email: "loic@gmail.com",
            };
            chai.request(app)
                .delete(`/api/v2/accounts/ff`)
                .set('Authorization', "Bearer " + tokenAdmin)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should delete all account", (done) => {
            newdb.query(`delete from accounts`);
            done();
        });
    });
});


