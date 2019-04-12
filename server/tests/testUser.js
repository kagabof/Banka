import chai from  "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
chai.should();

let token = '';
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

        it("should signin", (done)=>{
            const user ={
                email: "faustinkagabo@gmail.com",
                password: "Fofo1995@",
            }
            chai.request(app)
                .post('/api/v1/signin')
                .send(user)
                .end((req,res)=>{
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data").should.be.an('object');
                    token = res.body.data.token;
                    done();
                })
        });
        it("should not signin", (done) => {
            const user = {
                email: "faustinkagabo@gmail.com",
                password: "",
            }
            chai.request(app)
                .post('/api/v1/signin')
                .send(user)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error").eql("the user does note exist");
                    done();
                });
        });
        
    });
    describe('GET /', ()=>{
        it("should get all users while no valid token", (done)=>{
            chai.request(app)
                .get('/api/v1/user/getall')
                .end((req,res)=>{
                    res.should.have.status(401);
                    done();
                })
        });
        it("should get all use", (done) => {
            chai.request(app)
                .get('/api/v1/user/getall')
                .set('Authorization', "Bearer " + token)
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        })
    })
});

