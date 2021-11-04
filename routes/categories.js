var express = require('express');
var router = express.Router();
var categories = require('../models/categories');

router.get('/', function(req, res, next) {
  res.send('Categories');
});

module.exports = router;
