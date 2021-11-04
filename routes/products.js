var express = require('express');
var router = express.Router();
var products = require('../models/products');

router.get('/', function(req, res, next) {
  res.send('Products');
});

module.exports = router;
