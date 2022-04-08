const chai = require("chai");
chai.use(require("chai-http"));
const server = require("../app");
const should = chai.should();
const expect = chai.expect;
const proxyquire = require('proxyquire');
const testServerObject = proxyquire('../app', {'./routes/importer':proxyquire('../routes/importer', {'express-jwt':(...args)=>{return (req, res, next)=>{return next();}}})});
const models = require("../models");

describe("contact", () => {
    it("[CT1] Should be able to send a contact us message", async() => {
        const FirstName = "Selim"
        const LastName = "Alastra"
        const Email = "selim.alastra@gmail.com"
        const Question = "Test"
        let res = await chai.request(testServerObject).post("/phenoflow/contactUs").send({FirstName:FirstName, LastName:LastName, Email:Email, Question:Question});
        res.should.have.status(200)
    }).timeout(0);

    it("[CT2] Should be able to send a register request", async() => {
        const FirstName = "Selim"
        const LastName = "Alastra"
        const Email = "selim.alastra@gmail.com"
        const Profession = "Student"
        const Motivation = "TEST"
        let res = await chai.request(testServerObject).post("/phenoflow/contactUs/joinUs").send({FirstName:FirstName, LastName:LastName, Email:Email, Profession:Profession, Motivation:Motivation});
        res.should.have.status(200)
    });

});