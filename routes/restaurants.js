var express = require('express');
var router = express.Router();
var restaurants = require('../models/restaurants');

router.get('/', function(req, res, next) {
  res.send('Restaurants');
});

module.exports = router;
