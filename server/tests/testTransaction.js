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
                .post(`/api/v1/${account}/debit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('account required');
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
                .post(`/api/v1/${account}/debit`)
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
                .post(`/api/v1/${account}/debit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('amount required');
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
                .post(`/api/v1/${account}/debit`)
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
                .post(`/api/v1/${account}/debit`)
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
                .post(`/api/v1/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('account required');
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
                .post(`/api/v1/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('account not found');
                    done();
                });
        });

        it("should not credit while no amount", (done) => {
            const trans = {
                amount: "",
                chaierId: 2,
            };
            const account = 123456;
            chai.request(app)
                .post(`/api/v1/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql('amount required');
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
                .post(`/api/v1/${account}/credit`)
                .send(trans)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.a('object');
                    done();
                });
        });
     });
})