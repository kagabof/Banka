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
                .post(`/api/v2/auth/signup`)
                .send(user)
                .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });


        // it("should not create when Expectation Failed ", (done) => {
        //     const user = {
        //         email: "kagabo@gmail.com",
        //         firstName: "Kabeho",
        //         lastName: "fefe",
        //         password: "",
        //     };
        //     chai.request(app)
        //         .post(`/api/v1/auth/signup`)
        //         .send(user)
        //         .end((req, res) => {
        //             res.should.have.status(417);
        //             res.body.should.be.a('object');
        //             res.body.should.have.property("status").eql(417);
        //             done();
        //         });
        // });

    //     it("should signin", (done)=>{
    //         const user ={
    //             email: "faustinkagabo@gmail.com",
    //             password: "Fofo1995@",
    //         }
    //         chai.request(app)
    //             .post('/api/v1/auth/signin')
    //             .send(user)
    //             .end((req,res)=>{
    //                 res.should.have.status(202);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property("data").should.be.an('object');
    //                 token = res.body.data.token;
    //                 done();
    //             })
    //     });
    //     it("should not signin with no bad credentials", (done) => {
    //         const user = {
    //             email: "faustinkagabo@gmail.com",
    //             password: "ffff",
    //         }
    //         chai.request(app)
    //             .post('/api/v1/auth/signin')
    //             .send(user)
    //             .end((req, res) => {
    //                 res.should.have.status(401);
    //                 res.body.should.be.a('object');
    //                 done();
    //             });
    //     });
    //     it("should not signin with no password", (done) => {
    //         const user = {
    //             email: "faustinkagabo@gmail.com",
    //             password: "",
    //         }
    //         chai.request(app)
    //             .post('/api/v1/auth/signin')
    //             .send(user)
    //             .end((req, res) => {
    //                 res.should.have.status(406);
    //                 res.body.should.be.a('object');
    //                 done();
    //             });
    //     });
        
    // });
    // describe('GET /', ()=>{
    //     it("should get all users while no valid token", (done)=>{
    //         chai.request(app)
    //             .get('/api/v1/user/getall')
    //             .end((req,res)=>{
    //                 res.should.have.status(401);
    //                 done();
    //             })
    //     });
    //     it("should get all use", (done) => {
    //         chai.request(app)
    //             .get('/api/v1/user/getall')
    //             .set('Authorization', "Bearer " + token)
    //             .end((req, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //     })
    })
});

