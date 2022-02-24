const express = require('express');
const router = express.Router();
const models = require('../models');

router.get("/", async function(req, res, next) {

  res.render("help", {title:"Help page"});

});

module.exports = router;