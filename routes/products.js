const express = require('express');
const router = express.Router();
const products = require('../models/products');

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
