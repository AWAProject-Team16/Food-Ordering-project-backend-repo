const express = require('express');
const router = express.Router();
const orders = require('../models/orders');

router.get('/', function(req, res, next) {
  res.send('Orders');
});

module.exports = router;
