const express = require('express');
const router = express.Router();
const orders = require('../models/orders');

// Get order information by orderId
router.get('/', 
function(req, res) {
    orders.getOrderById(req.body,
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(dbResult);
      }
    });
});

// Get all customer orders by userId
router.get('/',
function(req, res) {
  orders.getOrderByCustomer(req.body,
  function(err, dbResult) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(dbResult);
    }
  });
});

// Get all manager orders by userId
router.get('/', 
function(req, res) {
  orders.getOrderByManager(req.body,
  function(err, dbResult) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(dbResult);
    }
  });
});

// Get all restaurant orders by restaurantId
router.get('/',
function(req, res) {
  orders.getOrderByRestaurant(req.body,
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
