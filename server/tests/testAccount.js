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
        it("it should not create the account with out with no user", (done) => {
            const user = {
                owner: "",
                type: "saving",
            }

            chai.request(app)
                .post('/api/v1/accounts')
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
                .post('/api/v1/accounts')
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
                    res.should.have.a.status(400);
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('error').eql("account not found");
                    done();
                });
        });
    });
    describe("GET /", () =>{
        it("should an account", (done) =>{
            chai.request(app)
                .get('/api/v1/account')
                .end((req,res) => {
                    res.should.have.a.status(200);

                    done();
                });
        });
        // it("should get an account", (done) => {
        //     const accountNumber = 123456;
        //     chai.request(app)
        //         .get(`/api/v1/account/${accountNumber}`)
        //         .end((req, res) => {
        //             res.should.have.a.status(200);
        //             done();
        //         });
        // });
    });

});