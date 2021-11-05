const express = require('express');
const router = express.Router();
const restaurants = require('../models/restaurants');

router.get('/', function(req, res, next) {
  res.send('Restaurants');
});

module.exports = router;
