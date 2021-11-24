const express = require('express');
const router = express.Router();
const orders = require('../models/orders');
const db = require('../lib/database.js');

// Get order information by orderId
router.get('/:id', 
function(req, res) {
    orders.getOrderById(req.params.id, req.body,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(200).json('Order not found');
        }
        else {
          res.status(200).json({Order: dbResult})
        }

      }
    });
});

router.get('/:id',
function(req, res) {
  orders.getOrderStatus(req.params.id,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(200).json('Order not found');
        }
        else {
          res.status(200).json({Status: dbResult});
        }
      }
    });
});

// Get all customer orders by userId
router.get('/',
function(req, res) {
  orders.getOrdersByCustomer(req.body,
  function(err, dbResult) {
    if(err) {
      res.status(500).json(err);
    }
    else {
      if(dbResult == '') {
        res.status(200).json('Orders not found');
      }
      else {
        res.status(200).json({Orders: dbResult});
      }
    }
  });
});

// Get all manager orders by userId
router.get('/',
function(req, res) {
  orders.getOrdersByManager(req.body,
  function(err, dbResult) {
    if(err) {
      res.status(500).json(err);
    }
    else {
      if(dbResult == '') {
        res.status(200).json('Orders not found')
      }
      else {      
        res.status(200).json({Orders: dbResult});
      }

    }
  });
});

// Get all restaurant orders by restaurantId
router.get('/restaurant/:restaurantId',
function(req, res) {
  orders.getOrdersByRestaurant(req.params.restaurantId, req.body,
  function(err, dbResult) {
    if(err) {
      res.status(500).json(err);
    }
    else {
      if(dbResult == '') {
        res.status(200).send('Orders not found');
      }
      else {      
        res.status(200).json({Orders: dbResult});
      }

    }
  });
});

router.post('/',
function(req, res) {
  orders.addOrder(req.body,
    function(err) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        res.status(201).json({Status: 'Order created'});
        orders.addDetailedOrder(req.body,
          function(err) {
            if(err) {
              res.status(400).json(err);
            }
            else {
              res.status(201).json({Status: 'Extra details created'});
            }
          });
      }
    })
})

module.exports = router;
