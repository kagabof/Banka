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
});