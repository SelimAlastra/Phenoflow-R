const chai = require("chai");
chai.use(require("chai-http"));

const proxyquire = require('proxyquire');
const testServerObject = proxyquire('../app', {'./routes/importer':proxyquire('../routes/importer', {'express-jwt':(...args)=>{return (req, res, next)=>{return next();}}})})

describe("login", () => {

    it("[F1] Should not be able to login with correct credentials", async() => {
        const user = "martinchapman"
        const password = "password"
        let res = await chai.request(testServerObject).post("/phenoflow/login/").send({user:user, password:password});
        res.should.have.status(200)
    }).timeout(0);

    it("[F2] Should not be able to login with wrong credentials", async() => {
        const user = "martinchapman"
        const password = "wrongpassword"
        let res = await chai.request(testServerObject).post("/phenoflow/login/").send({user:user, password:password});
        res.should.have.status(401)
    }).timeout(0);

});