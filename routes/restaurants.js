const express = require('express');
const router = express.Router();
const restaurants = require('../models/restaurants');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const db = require('../lib/database.js');


router.get('/', 
function(req, res) {
    restaurants.allRestaurants(
    function(err, dbResult) {
      if(err) {
        res.status(404).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(200).send("No available restaurants")
        }
        else{
          res.status(200).json({Restaurants: dbResult});
        }
      }
    });
});

router.get('/type/:restaurant_type?', 
function(req, res) {
    restaurants.foodCategoryRestaurants(req.params.restaurant_type,
    function(err, dbResult) {
      if(err) {
        res.status(404).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(200).send("Restaurant type not found")
        }
        else{
          res.status(200).json({Restaurants: dbResult});
        }
      }
    });
});

router.get('/ownRestaurants', function(req, res) {
    restaurants.getManagerRestaurants(req.body,
    function(err, dbResult) {
      if(err) {
        res.status(404).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(200).send("Own restaurants not found");
        }
        else {
          res.status(200).json({Own_Restaurants: dbResult});
        }
      }
    });
});

router.get('/id/:idrestaurants?',
  function(req, res) {
    restaurants.getRestaurantById(req.params.idrestaurants,
    function(err, dbResult) {
      if(err) {
        res.status(404).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(200).send("Restaurant not found");
        }
        else {
          res.status(200).json(dbResult);
        }
      }

  });
});

router.post('/newRestaurant',
  function(req, res) {
    restaurants.createRestaurant(req.body,
    function(err, dbResult) {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(201).json({'status': 201 + ', New restaurant created'});
      }
    });
});

module.exports = router;
