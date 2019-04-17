import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
chai.should();


describe("Account", () => {
    describe("POST /", () => {
        it("create an account", (done) => {
            const user = {
                owner: 1,
                type: "saving",
            }
            chai.request(app)
                .post('/api/v1/accounts')
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.an('object');
                    done();
                });
        });
        it("it should not create with a none existing owner", (done) => {
            const user = {
                owner:5,
                type: "saving",
            }

            chai.request(app)
                .post('/api/v1/accounts')
                .send(user)
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                }
                );
        });
        it("it should not create with empty owner or type", (done) => {
            const user = {
                type: "saving",
            }

            chai.request(app)
                .post('/api/v1/accounts')
                .send(user)
                .end((req, res) => {
                    res.should.have.status(406);
                    done();
                }
                );
        });
    });
    describe('PATCH /', ()=>{
        it('activate the account', (done)=>{
            const accountNumber = 123456;

            chai.request(app)
                .patch(`/api/v1/account/${accountNumber}`)
                .end((req,res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(201);
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                }
            );
        });
        it('Admin must deactivate the account', (done) => {
            const accountNumber = 123456;
            chai.request(app)
                .patch(`/api/v1/account/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(201);
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                }
                );
        });
        it('should note activate while account not found', (done) => {
            const accountNumber = 12345;
            chai.request(app)
                .patch(`/api/v1/account/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('error').eql('account not found');
                    done();
                });
        });
        it('should note activate while account is not a integer', (done) => {
            const accountNumber = "fofo";
            chai.request(app)
                .patch(`/api/v1/account/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(404);
                    done();
                });
        });
        it('should note activate while account is not a empty', (done) => {
            let accountNumber;
            chai.request(app)
                .patch(`/api/v1/account/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(404);
                    done();
                });
        });

    });
    describe('DELETE /', ()=>{
        it("should delete the account while accountNumber exist", (done)=>{
            const accountNumber = 123456;
            chai.request(app)
                .delete(`/api/v1/accounts/${accountNumber}`)
                .end((req,res) => {
                    res.should.have.a.status(202);
                    res.body.should.have.property('status').eql(202);
                    res.body.should.have.property('message').eql('Account successfully deleted');
                    done();
                });
        });
        it("should not delete the account while accountNumber doesn't exist", (done) => {
            const accountNumber = 1234;
            chai.request(app)
                .delete(`/api/v1/accounts/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    res.body.should.have.property('status').eql(404);
                    res.body.should.have.property('error').eql("account not found");
                    done();
                });
        });
        it("should not delete the account while accountNumber is not a number", (done) => {
            const accountNumber = "ffoof";
            chai.request(app)
                .delete(`/api/v1/accounts/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.a.status(406);
                    res.body.should.have.property('status').eql(406);
                    done();
                });
        });
        it("should not delete the account while accountNumber is empty", (done) => {
            let accountNumber;
            chai.request(app)
                .delete(`/api/v1/accounts/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.a.status(406);
                    res.body.should.have.property('status').eql(406);
                    done();
                });
        });
    });
    describe("GET /", () =>{
        it("should get all account", (done) =>{
            chai.request(app)
                .get('/api/v1/account')
                .end((req,res) => {
                    res.should.have.a.status(200);

                    done();
                });
        });
        it("should get an account", (done) => {
            const accountNumber = 1234567;
            chai.request(app)
                .get(`/api/v1/account/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
        it("should get not get an account", (done) => {
            const accountNumber = 123;
            chai.request(app)
                .get(`/api/v1/account/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });
        it("should get not get an account", (done) => {
            let accountNumber;
            chai.request(app)
                .get(`/api/v1/account/${accountNumber}`)
                .end((req, res) => {
                    res.should.have.a.status(406);
                    done();
                });
        });
        
    });

});