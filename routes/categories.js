const { response } = require('express');
const express = require('express');
const router = express.Router();
const categories = require('../models/categories');
const db = require('../lib/database.js');

// Get all categories
// router.get('/', function(res) {
//   categories.getAllCategories(function(err, dbResult) {
//     if(err) {
//       response.json(err);
//     }
//     else {
//       response.json(dbResult);
//     }
//   });
// });


// Get restaurant categories
router.get('/restaurant/:restaurantId', 
function(req, res) {
  categories.getRestaurantCategories(req.params.restaurantId,
    function(err, dbResult) {
    if(err) {
      res.json(err);
    }
    else {
      res.status(200).json({Categories: dbResult});
    }
  });
});

router.post('/addCategory',
function(req, res) {
  categories.addCategory(req.body,
    function(err, dbResult) {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(201).json({Status: 'Category added'});
      }
    });
});

router.delete('/deleteCategory',
function(req, res) {
  categories.deleteCategory(req.body,
    function(err) {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(200).json({Status: 'Category deleted'})
      }
    });
});
module.exports = router;