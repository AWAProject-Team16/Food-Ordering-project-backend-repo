const express = require('express');
const router = express.Router();
const products = require('../models/products');

router.get('/', function(req, res, next) {
  res.send('Products');
});

module.exports = router;
