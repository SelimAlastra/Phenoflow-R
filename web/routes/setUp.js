const express = require('express');
const router = express.Router();
const models = require('../models');
const nodemailer = require('nodemailer')

router.get("/", async function(req, res, next) {

  res.render("setUp", {title:"Learn to use phenoflow easily depending of your operating system"});

});

router.post('/contactUs', async function(req, res, next) {   
    const output = `
        <p> You received a new message from the Contact Us page </p>
        <h3> Contact details </h3>
        <ul>
            <li> First name : ${req.body.FirstName} </li>
            <li> Last name : ${req.body.LastName} </li>
            <li> Email : ${req.body.Email} </li>
        </ul>
        <h3> Message </h3>
        <p>${req.body.Question}</p>
    `;

    const transporter = nodemailer.createTransport( {
        service: "hotmail",
        auth: {
            user: "phenoflowr@hotmail.com",
            pass: "phenoflow12345"
        }
    });
    const options = {
        from: "phenoflowr@hotmail.com",
        to: "phenoflowr@gmail.com",
        subject: `New message from ${req.body.LastName}`,
        text: "You received a new message",
        html: output
    }
    
    transporter.sendMail(options, function(err,info){
        if(err){
            res.render('contactUs.pug', {
                msg: 'Sorry, an error happened !'
            });
            return console.log(err);
        }
        else{
        console.log("Sent:" + info.response);
        res.render('contactUs.pug', {
            msg: 'Your message has been sent !'
        });
    }   
    });

});

module.exports = router;