const express = require('express');
const router = express.Router();
const orders = require('../models/orders');
const db = require('../lib/database');

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
router.post('/ordersHistory/orderId/:idorders', passport.authenticate('jwt', { session: false }),
function(req, res) {
  orders.getOrderDetails(req.user.user, req.params.idorders,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == 'undefined') {
          res.status(400).json({"Status": 400 + ", Order Id does not exist"});
        }
        else {
          res.status(200).json(dbResult);
        }
      }
    });
});

router.post('/ordersHistory/restaurant/:idrestaurants', passport.authenticate('jwt', {session: false}),
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



// router.post('/addOrder', passport.authenticate('basic', {session: false}),
// function(req, res) {
//   orders.newOrderInfo(req.user, req.body,
//     function(err, dbResult) {
//       if(err) {
//         res.status(500).json(err);
//       }
//       else {
//         if(dbResult.affectedRows == 0) {
//           res.status(400).json({"Status": 400 +", Something wrong with order creating. For help, contact the IT-manager"});
//         }
//         else {
//           orders.addOrder(req.user, req.body,
//             function(err, db) {
//               if(err) {
//                 res.status(500).json(err);
//               }
//               else {
//                 if(db.affectedRows == 0) {
//                   res.status(400).json({"Status": 400 +", Something wrong with order details creating. For help, contact the IT-manager"});
//                 }
//                 else {
//                   res.status(401).json({"Status": 201 +", Order with details created"});
//                 }
//               }
//             });
//         }
//       }
//     });
// });

module.exports = router;
