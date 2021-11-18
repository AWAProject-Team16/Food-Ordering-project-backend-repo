const express = require('express');
const router = express.Router();
const restaurants = require('../models/restaurants');
const db = require('../lib/database.js');

router.get('/type/:restaurant_type?', 
function(req, res) {
    restaurants.foodCategoryRestaurants(req.params.restaurant_type,
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        if(dbResult == '') {
          res.status(404).send("Restaurant type not found")
        }
        else{
          res.status(200).json({Restaurants: dbResult});
        }
      }
    });
});

router.get('/ownRestaurants',
function(req, res) {
    restaurants.getManagerRestaurants(req.body,
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        if(dbResult == '') {
          res.status(404).send("Own restaurants not found");
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
        res.json(err);
      }
      else {
        if(dbResult == '') {
          res.status(404).send("Restaurant not found");
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
        res.json(err);
      }
      else {
        res.status(201).json({'status': 201 + ', New restaurant created'});
      }
    });
});


// router.post('/:id/menuCreation',
// function(req, res) {
//   restaurants.newMenu(req.body,
//     function(err, dbResult) {
//       if(err) {
//         res.status(400).json(err);
//       }
//       else {
//         res.status(201).json({'status': 201 + ', Menu created for restaurant'});
//       }
//     });
// });


// router.post('/restaurant/modifyRestaurant', function(req, res) {
//   restaurants.modifyRestaurant(req.body,
//     function(err, dbResult) {
//       if(err) {
//         res.json(err);
//       }
//       else {
//         res.json(dbResult[1]); // 1 = success
//       }
//     });
// });

module.exports = router;
