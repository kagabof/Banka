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
                .post('/api/v1/createAccount')
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.an('object');
                    done();
                });
        });
        it("it should not create the account with out with no user", (done) => {
            const user = {
                owner: "",
                type: "saving",
            }

            chai.request(app)
                .post('/api/v1/createAccount')
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error').eql('owner not found!');
                    done();
                }
                );
        });
        it("it should not create the account", (done) => {
            const user = {
                owner: 1,
                type: "",
            }

            chai.request(app)
                .post('/api/v1/createAccount')
                .send(user)
                .end((req, res) =>{
                    res.should.have.status(400);
                    res.body.should.have.property('error').eql('type is required!');
                    done();
                }
            );
        });
    });
    describe('PATCH /', ()=>{
        it('Admin must activate the account', (done)=>{
            const act ={
                id: 1,
                accountNumber: 123456,           
            };

            chai.request(app)
                .patch("/api/v1/activateDeactivateAccount")
                .send(act)
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
            const act = {
                id: 1,
                accountNumber: 123456,
            };

            chai.request(app)
                .patch("/api/v1/activateDeactivateAccount")
                .send(act)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(201);
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                }
                );
        });
        

        it('should note activate while no user found',(done) =>{
            const act = {
                id: 5,
                accountNumber: 123456,
            };
            chai.request(app)
                .patch('/api/v1/activateDeactivateAccount')
                .send(act)
                .end((req,res) =>{
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('error').eql('user not found');
                    done();
                });
        });
        it('should note activate while user is note an admin', (done) => {
            const act = {
                id: 2,
                accountNumber: 123456,
            };
            chai.request(app)
                .patch('/api/v1/activateDeactivateAccount')
                .send(act)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('error').eql('user is not admin to deactivate or activate the account');
                    done();
                });
        });
        it('should note activate while account not found', (done) => {
            const act = {
                id: 1,
                accountNumber: 12345,
            };
            chai.request(app)
                .patch('/api/v1/activateDeactivateAccount')
                .send(act)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('error').eql('account not found');
                    done();
                });
        });

    });
});