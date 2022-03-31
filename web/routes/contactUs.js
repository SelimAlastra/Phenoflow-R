const express = require('express');
const router = express.Router();
const models = require('../models');
const nodemailer = require('nodemailer')
require('dotenv').config();


router.get("/", async function(req, res, next) {

  res.render("contactUs", {title:"Contact Us "});
});

router.get("/joinUs", async function(req, res, next) {

    res.render("joinUs", {title:"Contact Us "});
  });


router.post("/joinUs", async function(req, res, next) {  

    let isEmailValid = req.body.Email.toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        
    if(!isEmailValid){res.render('joinUs.pug', {
        title: 'Sorry, an error happened !',
        errorMsg: "The email is invalid !"
        });
        return
    }

    const output = `
        <p> Registration email </p>
        <h3> Contact details </h3>
        <ul>
            <li> First name : ${req.body.FirstName} </li>
            <li> Last name : ${req.body.LastName} </li>
            <li> Email : ${req.body.Email} </li>
            <li> Profession : ${req.body.Profession} </li>
        </ul>
        <h3> Motivation </h3>
        <p>${req.body.Motivation}</p>
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
        subject: 'Registration email',
        text: 'It works',
        html: output
    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            res.render('joinUs.pug', {
                title: 'Sorry, an error happened !',
                errorMsg: "Sorry, an error happened !'"
            });
            return console.log(err);
        }
        else{
        console.log("Sent:" + info.response);
        res.render('joinUs.pug', {
            title: 'Contact US - Your message has been sent !',
            msg: "Your message has been sent !"
        });
    }   
    });

});

router.post("/", async function(req, res, next) {

    let isEmailValid = req.body.Email.toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        
    if(!isEmailValid){res.render('contactUs.pug', {
        title: 'Sorry, an error happened !',
        errorMsg: "The email is invalid !"
        });
        return
    }
    
      
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
                title: 'Contact US - Sorry, an error happened !',
                errorMsg: "Sorry, an error happened !'"
            });
            return console.log(err);
        }
        else{
        console.log("Sent:" + info.response);
        res.render('contactUs.pug', {
            title: 'Contact US - Your message has been sent !',
            msg: "Your message has been sent !"
        });
    }   
    });

});

module.exports = router;
