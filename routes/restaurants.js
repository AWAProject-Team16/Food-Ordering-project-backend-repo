const express = require('express');
const router = express.Router();
const restaurants = require('../models/restaurants');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize());


// Get all restaurants. Works
router.get('/', 
function(req, res) {
    restaurants.allRestaurants(
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(404).send({Status: 404 + ", No available restaurants"});
        }
        else{
          res.status(200).json({ Restaurants: dbResult });
        }
      }
    });
});

// Get restaurant by restaurant id. Works
router.get('/id/:restaurant_id',
  function(req, res) {
    restaurants.getRestaurantById(req.params.restaurant_id,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(404).send({Status: 404 + ", Restaurant not found"});
        }
        else {
          res.status(200).json( dbResult );
        }
      }

  });
});

// Get all restaurants by restaurant type (example 'Fastfood'). Works
router.get('/type/:restaurant_type', 
function(req, res) {
    restaurants.foodCategoryRestaurants(req.params.restaurant_type,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(404).send({Status: 404 + ", Restaurant type not found"});
        }
        else{
          res.status(200).json({ Restaurants: dbResult });
        }
      }
    });
});

// Get all user restaurants who authenticated and have account_type = 2. But if account_type != 2, then get same error message thats manager get (Own restaurants not found)
router.post('/ownRestaurants', passport.authenticate('basic', { session: false }), (req, res) => {
    restaurants.getManagerRestaurants(req.user,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(404).send({Status: 404 + ", Own restaurants not found"});
        }
        else { 
          res.status(200).json({ Own_Restaurants: dbResult });
        }
      }
    });
});

// Creates new restaurant. Without checking account_type from selected user. Not yet done
router.post('/newRestaurant', passport.authenticate('basic', { session: false }),
  function(req, res) {
    restaurants.createRestaurant(req.user, req.body,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.affectedRows == 0) {
          res.status(200).send({Status: 404 + ", Something wrong with new restaurant creating. Try again or contact the IT-manager"});
        }
        else {
          res.status(201).json({'Status': 201 + ', New restaurant created'});
        }
      }
    });
});

// Modifies selected restaurant by restaurantId. If the account does not have permission to do so, the restaurant cannot be changed. Works
router.post('/:restaurant_id/editRestaurant', passport.authenticate('basic', {session: false}),
 function(req, res) {
   if(req.body.name.length < 3)
   {
     res.status(200).json({'Status': 200 + ', Restaurant name too small. Minimum 3 symbols'});
   }

   else {
   restaurants.editRestaurant(req.user, req.params.restaurant_id, req.body,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.affectedRows == 0) {
          res.status(200).json({'Status': 200 + ', Something wrong with restaurant updating. Try again or contact the IT-manager'});
        }
        else {
          res.status(201).json({'Status': 200 + ", Restaurant '"+req.body.name+"' changed"});
        }
      }
    });
  }
 });

// Removes the restaurant by restaurantId. If not your own restaurant, restaurant deletion is not possible. Works
router.delete('/:restaurant_id/deleteRestaurant', passport.authenticate('basic', {session: false}),
  function(req, res) {
    restaurants.deleteRestaurant(req.user, req.params.restaurant_id,
      function(err, dbResult) {
        if(err) {
          res.status(500).json(err);
        }
        else {
          if(dbResult.affectedRows == 0) {
            res.status(400).json({'Status': 400 + ', Something wrong with restaurant deleting. Try again or contact the IT-manager'});
          }
          else {
            res.status(200).json({'Status': 200 + ', Restaurant '+req.params.restaurant_id+' deleted'});
          }
        }
      });
});



module.exports = router;
