const { response } = require('express');
const express = require('express');
const { resetIndex } = require('isomorphic-git');
const router = express.Router();
const models = require('../models');

router.get("/", async function(req, res, next) {

  res.render("definePage", {title:"Choose the way to define your phenotype definition"});

});

router.get("/API", async function(req, res, next) {
    res.render("defineByAPI", {title:"Use the API to define your phenotypes"});
  
});

module.exports = router;