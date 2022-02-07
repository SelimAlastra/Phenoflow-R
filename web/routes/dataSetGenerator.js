const express = require('express');
const router = express.Router();
const models = require('../models');

router.get("/", async function(req, res, next) {

  res.render("dataSetGenerator", {title:"Generate a data set easily", count: await models.workflow.count({distinct:true, col:'name'})});

});

module.exports = router;