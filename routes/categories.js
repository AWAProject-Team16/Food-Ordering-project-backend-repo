const express = require('express');
const router = express.Router();
const categories = require('../models/categories');

router.get('/', function(req, res, next) {
  res.send('Categories');
});

module.exports = router;
