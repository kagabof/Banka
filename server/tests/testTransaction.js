import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
chai.should();

describe("Transaction", () => {
    describe("POST /", () => {
        it("should not debit while no account", (done) => {
            const trans = {
                amount: 40000000,
                chaierId: 2,
            };
            const account = "fofo";
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not debit while rong account number", (done) => {
            const trans = {
                amount: 4000,
                chaierId: 2,
            };
            const account = 12345;
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('account not found');
                    done();
                });
        });

        it("should not debit while no amount", (done) => {
            const trans = {
                amount: "",
                chaierId: 2,
            };
            const account = 123456;
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not debit while amount is greater", (done) => {
            const trans = {
                amount: 40000000,
                chaierId: 2,
            };
            const account = 1234567;
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('balance is less than the amount');
                    done();
                });
        });

        it("should debit", (done) => {
            const trans = {
                amount: 4000,
                cachierId: 2,
            };
            const account = 1234567;
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.a('object');
                    done();
                });
        });
        
        /* for crediting*/

        it("should not credit while no account", (done) => {
            const trans = {
                amount: 40000000,
                chaierId: 2,
            };
            const account = "fofo";
            chai.request(app)
                .post(`/api/v1/transactions/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not credit while rong account number", (done) => {
            const trans = {
                amount: 4000,
                chaierId: 2,
            };
            const account = 12345;
            chai.request(app)
                .post(`/api/v1/transactions/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('sorry, account-number not found.');
                    done();
                });
        });

        it("should not credit while no amount", (done) => {
            const trans = {
                chaierId: 2,
            };
            const account = 123456;
            chai.request(app)
                .post(`/api/v1/transactions/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should credit", (done) => {
            const trans = {
                amount: 4000,
                cachierId: 2,
            };
            const account = 1234567;
            chai.request(app)
                .post(`/api/v1/transactions/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.a('object');
                    done();
                });
        });
     });

     describe('GET /', () => {
         it('should get all transactions', (done) =>{
             chai.request(app)
                 .get('/api/v1/transactions/getall')
                 .end((req,res)=>{
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property("data").should.be.a('object');
                     done();
                 });
         });

         
         it('should get transaction', (done) => {
             const account = 123456;
             chai.request(app)
                 .get(`/api/v1/transactions/${account}`)
                 .end((req, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                 });
         });
         it('should not get transaction becouse no transaction to the account', (done) => {
             const account = 1234567;
             chai.request(app)
                 .get(`/api/v1/transactions/${account}`)
                 .end((req, res) => {
                     res.should.have.status(404);
                     res.body.should.be.a('object');
                     res.body.should.have.property("error").eql('Zero transaction to the account given');
                     done();
                 });
         });
         it('should not get transaction when account is not a integer', (done) => {
             let account = "fff";
             chai.request(app)
                 .get(`/api/v1/transactions/${account}`)
                 .end((req, res) => {
                     res.should.have.status(400);
                     res.body.should.be.a('object');
                     done();
                 });
         });
         it('should not get transaction when account is empty', (done) => {
             let account;
             chai.request(app)
                 .get(`/api/v1/transactions/${account}`)
                 .end((req, res) => {
                     res.should.have.status(400);
                     res.body.should.be.a('object');
                     done();
                 });
         });
     });
})