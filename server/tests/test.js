import chai from  "chai";
import chaiHttp from "chai-http";
import app from "./../app";

chai.use(chaiHttp);
chai.should();

describe("Users", ()=>{
    describe("POST /", () => {
        it("should create a new user", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v1/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not create a new user with empty email", (done) => {
            const user = {
                email: "",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v1/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status").eql(400);
                    res.body.should.have.property("error").eql("email is required");
                    done();
                });
        });
        it("should not create a new user with empty name", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "",
                lastName: "Roger",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v1/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status").eql(400);
                    res.body.should.have.property("error").eql("first name is required");
                    done();
                });
        });

        it("should not create a new user with empty last name", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "Kabeho",
                lastName: "",
                password: "ffff",
            };
            chai.request(app)
                .post(`/api/v1/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status").eql(400);
                    res.body.should.have.property("error").eql("last name is required");
                    done();
                });
        });

        it("should not create a new user with empty last name", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "Kabeho",
                lastName: "fefe",
                password: "",
            };
            chai.request(app)
                .post(`/api/v1/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status").eql(400);
                    res.body.should.have.property("error").eql("password is required");
                    done();
                });
        });

        
    });
});