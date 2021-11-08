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


// Get category by id
router.get('/id', (req, res) => {
  categories.getCategoryById(req.body, function(err, dbResult) {
    if(err) {
      response.json(err);
    }
    else {
      response.json(dbResult);
    }
  })
});

router.post('/categoryCreation', (req, res) => {
  categories.createCategory(req.body, function(err, dbResult) {
    if(err) {
      response.json(err);
    }
    else {
      response.json(dbResult);
    }
  })
});

module.exports = router;