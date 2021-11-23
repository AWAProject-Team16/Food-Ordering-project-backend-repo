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
        res.status(200).json('Category is empty');
      }
      else {
        res.status(200).json({dbResult});
      }
    }
  });
});

router.post('/addProduct',
function(req, res) {
  products.addProduct(req.body,
    function(err, dbResult) {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(201).json({Status: 'Product added'});
      }
    });
});

router.delete('/deleteProduct',
function(req, res) {
  products.deleteProduct(req.body,
    function(err, dbResult) {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(200).json({Status: "Product deleted"});
      }
    });
});

module.exports = router;
