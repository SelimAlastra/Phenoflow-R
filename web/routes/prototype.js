const express = require('express');
const router = express.Router();
const models = require('../models');

router.get("/", async function(req, res, next) {

  res.render("prototype", {title:"Prototype page : Get used to phenoflow architecture easily"});

});

module.exports = router;
