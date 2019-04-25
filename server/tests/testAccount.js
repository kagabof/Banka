import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import newdb from "../db/db"

chai.use(chaiHttp);
chai.should();

let token = '';
let tokenSigninUser = '';
let tokenAdmin = '';

describe("Users", () => {
    describe("POST /", () => {
        it("should create a new user(client)", (done) => {
            const user = {
                email: "client@gmail.com",
                firstName: "client",
                lastName: "client",
                password: "Client",
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
        it("should create a new user(staff)", (done) => {
            const user = {
                email: "staff@gmail.com",
                firstName: "staff",
                lastName: "staff",
                password: "Staff@",
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
    })
});