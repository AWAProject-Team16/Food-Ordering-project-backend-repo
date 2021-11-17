const { response } = require('express');
const express = require('express');
const router = express.Router();
const categories = require('../models/categories');

// Get all categories
router.get('/', function(res) {
  categories.getAllCategories(function(err, dbResult) {
    if(err) {
      response.json(err);
    }
    else {
      response.json(dbResult);
    }
  })
});

// Get restaurant categories
router.get('/restaurant', 
function(req, res) {
  categories.getRestaurantCategories(req.body,
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