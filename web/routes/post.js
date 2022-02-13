const express = require('express');
const router = express.Router();
const models = require("../models")

//get post list
// To see all posts in the terminal use this
// router.get("/",(req, res) => 
//     models.post.findAll()
//     .then(post => {
//       console.log(post);
//       res.sendStatus(200);
//     })
//     .catch(err => console.log(err))
// );

router.get("/",(req, res) => 
    models.post.findAll()
    .then(post => {
      res.render('post', {
        post,
        title: "Phenoflow FORUM"
      });
    })
    .catch(err => console.log(err))
);
  


//add a post 

router.get("/add",(req, res) => {
  const data = {
    name : "Phenoflow OS",
    description : "Phenoflow for Linux",
    author: "Ahmed"
  }
  let {name,description,author} = data

  //Insert into table
  models.post.create({
    name,
    description,
    author
  })
    .then(post => res.redirect("/phenoflow/post"))
    .catch(err => console.log(err))
});

module.exports = router;