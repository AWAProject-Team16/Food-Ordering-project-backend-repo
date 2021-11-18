const express = require('express');
const router = express.Router();
const products = require('../models/products');
const db = require('../lib/database.js');

router.get('/', 
function(req, res) {
  products.getProductById(req.body,
  function(err, dbResult){
    if(err) {
      res.json(err);
    }
    else {
      res.json(dbResult);
    }
  });
});

router.get('/',
function(req, res) {
  products.getProductByCategory(req.body,
  function(err, dbResult) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(dbResult);
    }
  });
});

module.exports = router;
