const express = require('express');
const router = express.Router();
const models = require("../models")
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

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


router.get("/",(req, res) => {


  if(Object.keys(req.query).length != 0){
    let {searchInput} = req.query;
    searchInput = searchInput.toLowerCase();
    models.post.findAll({
      where:
        Sequelize.or(
            {title: {[Op.like]: '%' + searchInput + '%'}},
            {question: {[Op.like]: '%' + searchInput + '%'}},
            {author: {[Op.like]: '%' + searchInput + '%'}}
        )
    })
      .then(post => {
        res.render ('forum', {
          searchInput,
          post,
          title: "Phenoflow FORUM",
        })
      })
      .catch(err => console.log(err))
  }
  else{
    models.post.findAll()
    .then(post => {
      res.render('forum', {
        post,
        title: "Phenoflow FORUM"
      });
    })
    .catch(err => console.log(err))
  }
  }
);


// router.get("/:id",  (req, res) => {
  


//   res.render('post', {
//     post : models.post.findOne({where:{id: req.params.id}}),
//     title: "Post number : " + req.params.id
//   })
    
// })

router.get("/:id", async function(req, res) {

  try {
    let post = await models.post.findOne({where:{id: req.params.id}});
    let answers = await models.answer.findAll({where:{postId : req.params.id}})
    res.render("post", {title:"Post number " + req.params.id , post : post , answers : answers});
  } catch(error) {
    logger.error(error);
    res.sendStatus(500);
  }

});

router.post("/:id",(req, res) => {

  let {content,author} = req.body

  models.answer.create({
    content,
    author,
    postId : req.params.id
  }).then(answer => res.redirect("/phenoflow/forum/" + req.params.id ))
  .catch(err => console.log(err))
})

//add a post 

router.post("/",(req, res) => {

  let {title,question,author} = req.body

  //Insert into table
  models.post.create({
    title,
    question,
    author
  })
    .then(post => res.redirect("/phenoflow/forum"))
    .catch(err => console.log(err))
});


module.exports = router;
