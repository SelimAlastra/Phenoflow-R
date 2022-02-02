const express = require('express');
const router = express.Router();
const models = require('../models');

router.get("/", async function(req, res, next) {

  res.render("setUp", {title:"Learn to use phenoflow easily depending of your operating system", count: await models.workflow.count({distinct:true, col:'name'})});

});

module.exports = router;