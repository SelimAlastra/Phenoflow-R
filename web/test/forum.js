const chai = require("chai");
chai.use(require("chai-http"));
const server = require("../app");
const should = chai.should();
const expect = chai.expect;
const proxyquire = require('proxyquire');
const testServerObject = proxyquire('../app', {'./routes/importer':proxyquire('../routes/importer', {'express-jwt':(...args)=>{return (req, res, next)=>{return next();}}})});
const models = require("../models");

describe("forum", () => {

    it("[F1] Should be to create a post", async() => {
        const postTitle = "Post test name"
        const postQuestion = "Post content test"
        const postAuthor = "Selim Alastra"
        let res = await chai.request(testServerObject).post("/phenoflow/forum").send({title:postTitle, question:postQuestion, author:postAuthor});
        res.should.redirect
    }).timeout(0);

    it("[F2] Should be able to create an author answer", async() => {
        let post = await models.post.findOne({order: [ [ 'id', 'DESC' ]]});
        // find last post
        let postId = post.id
        const content = "Verified answer"
        const author = "Selim"
        const verifiedAuthor = true
        let res = await chai.request(testServerObject).post("/phenoflow/forum/post/" + postId).send({content:content, author:author, verifiedAuthor:verifiedAuthor});
        res.should.have.status(200)
    }).timeout(0);

    it("[F3] Should be able to create an user answer", async() => {
        let post = await models.post.findOne({order: [ [ 'id', 'DESC' ]]});
        // find last post
        let postId = post.id
        const content = "User answer"
        const author = "Selim"
        const verifiedAuthor = false
        let res = await chai.request(testServerObject).post("/phenoflow/forum/post/" + postId).send({content:content, author:author, verifiedAuthor:verifiedAuthor});
        res.should.have.status(200)
    }).timeout(0);

    it("[F4] Should be able to remove a post", async() => {
        let post = await models.post.findOne({order: [ [ 'id', 'DESC' ]]});
        // find last post
        let postId = post.id
        let res = await chai.request(testServerObject).get("/phenoflow/forum/remove/" + postId)
        res.should.have.status(200)
    }).timeout(0);





});
