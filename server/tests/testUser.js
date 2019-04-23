import chai from  "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
chai.should();

let token = '';
let tokenSigninUser = '';
let tokenAdmin = '';
describe("Users", ()=>{
    describe("POST /", () => {
        it("should create a new user(client)", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
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
        it("should create note create a new user(client) because of the existing email", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
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
        it("should should signin (client)", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                password: "ffff",
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
        it("should should not signin (client)", (done) => {
            const user = {
                email: "kagabo@gmail.com",
                password: "fff",
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
                    console.log(res.body);
                    tokenAdmin = res.body.token;
                    done();
                });
        });

        it("should create a new user(client)", (done) => {
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
        it("should create a new user(admin)", (done) => {
            const user = {
                email: "kagaboad@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
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
        it("should create note create a new user(admin)", (done) => {
            const user = {
                email: "kagaboad@gmail.com",
                firstName: "Kabeho",
                lastName: "Roger",
                password: "ffff",
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
    });
});

