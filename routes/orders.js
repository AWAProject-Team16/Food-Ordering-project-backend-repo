var express = require('express');
var router = express.Router();
var orders = require('../models/orders');

router.get('/', function(req, res, next) {
  res.send('Orders');
});

module.exports = router;
