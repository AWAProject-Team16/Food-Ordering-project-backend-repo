const express = require('express');
const router = express.Router();
const orders = require('../models/orders.js');
const db = require('../lib/database.js');

const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize());


router.post('/ordersHistory', passport.authenticate('jwt', { session: false }),
function(req, res) {
  orders.getUserOrders(req.user.user,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(400).json({"Status": 400 + ', Orders not found'});
        }
        else {
          res.status(200).json({Orders: dbResult});
        }
      }
    });
});

// Gets order details (what products was ordered and its' costs)
router.post('/orderId/:idorders', passport.authenticate('jwt', { session: false }),
function(req, res) {
  orders.getOrderDetails(req.user.user, req.params.idorders,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.lenght == 0) {
          res.status(400).json({"Status": 400 + ", Order Id does not exist"});
        }
        else {
          res.status(200).json(dbResult);
        }
      }
    });
});

router.post('/restaurant/:idrestaurants', passport.authenticate('jwt', { session: false }),
function(req, res) {
  orders.getRestaurantOrders(req.user.user, req.params.idrestaurants,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(400).json({"Status": 400 + ", Orders not found"});
        }
        else {
          res.status(200).json({Orders: dbResult});
        }
      }
    });
});

    // res.json(dbResult.insertId);

router.post('/addOrder', passport.authenticate('jwt', { session: false }),
  function(req, res) {
    orders.addOrder(req.user.user, req.body,
      function(err, dbResult) {
        if(err) {
          res.status(500).json(err);
        }
        else {
          if(dbResult.affectedRows == 0) {
            res.status(400).json({"Status": 400 + ", Cannot add order. For help, contact the IT manager"});
          }
          else {
            orders.addOrderDetails(dbResult.insertId, req.body.ShoppingCart,
              function(err, dbResult) {
                if(err) {
                  res.status(500).json(err);
                }
                else {
                  res.status(201).json({"Status": 201 + ", Order added"});
                }
              });

          }
        }
      });
    });

module.exports = router;