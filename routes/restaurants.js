const express = require('express');
const router = express.Router();
const restaurants = require('../models/restaurants');

router.get('/', 
function(req, res) {
    restaurants.getAllRestaurants(
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(dbResult);
      }
    });
});

router.get('/manager',
function(req, res) {
    restaurants.getManagerRestaurants(req.body,
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(dbResult);
      }
    });
});

router.post('/newRestaurant',
  function(req, res) {
    restaurants.createRestaurant(req.body,
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(dbResult[1]); // 1 = success
      }
    });
});

/*
router.post('/restaurant/modifyRestaurant', function(req, res) {
  restaurants.modifyRestaurant(req.body,
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(dbResult[1]); // 1 = success
      }
    });
});
*/
module.exports = router;
