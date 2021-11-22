const express = require('express');
const router = express.Router();
const products = require('../models/products');
const db = require('../lib/database.js');

router.get('/:id', 
function(req, res) {
  products.getProductById(req.params.id,
  function(err, dbResult){
    if(err) {
      res.status(400).json(err);
    }
    else {
      if(dbResult == '') {
        res.status(200).json('Product not found');
      }
      else {
        res.status(200).json({Product: dbResult});
      }
    }
  });
});

router.get('/:category',
function(req, res) {
  products.getProductByCategory(req.params.category,
  function(err, dbResult) {
    if(err) {
      res.status(400).json(err);
    }
    else {
      if(dbResult == '') {
        res.status(200).json('Products in category not found');
      }
      res.status(200).json({dbResult});
    }
  });
});

module.exports = router;
