const express = require('express');
const router = express.Router();
const models = require('../models');
const nodemailer = require('nodemailer')
require('dotenv').config();


router.get("/", async function(req, res, next) {

  res.render("contactUs", {title:"Contact Us ", count: await models.workflow.count({distinct:true, col:'name'})});
});

router.post("/", async function(req, res, next) {   
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

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.nodemailerEMAIL,
            pass: process.env.nodemailerPASS,
            //USE .env to hide email adress
        }
    });
    
    let mailOptions = {
        from: process.env.nodemailerEMAIL,
        to: process.env.nodemailerEMAIL,
        subject: 'Contact Us message',
        text: 'It works',
        html: output
    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            res.render('contactUs.pug', {
                title: 'Contact US - Sorry, an error happened !'
            });
            return console.log(err);
        }
        else{
        console.log("Sent:" + info.response);
        res.render('contactUs.pug', {
            title: 'Contact US - Your message has been sent !'
        });
    }   
    });

});

module.exports = router;
