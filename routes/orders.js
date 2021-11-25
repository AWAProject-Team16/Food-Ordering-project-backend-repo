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

// For normal user with account_type = 1 (not manager)
router.post('/ordersHistory', passport.authenticate('basic', { session: false }),
function(req, res) {
  orders.getUserOrders(req.user,
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

router.post('/ordersHistory/orderId/:idorders', passport.authenticate('basic', { session: false }),
function(req, res) {
  orders.getOrderDetails(req.user, req.params.idorders,
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

router.post('/ordersHistory/restaurant/:idrestaurants', passport.authenticate('basic', {session: false}),
function(req, res) {
  orders.getRestaurantOrders(req.user, req.params.idrestaurants,
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


// // Get order information by orderId
// router.get('/:id', 
// function(req, res) {
//     orders.getOrderById(req.params.id, req.body,
//     function(err, dbResult) {
//       if(err) {
//         res.status(500).json(err);
//       }
//       else {
//         if(dbResult == '') {
//           res.status(200).json('Order not found');
//         }
//         else {
//           res.status(200).json({Order: dbResult})
//         }

//       }
//     });
// });

// router.get('/:id',
// function(req, res) {
//   orders.getOrderStatus(req.params.id,
//     function(err, dbResult) {
//       if(err) {
//         res.status(500).json(err);
//       }
//       else {
//         if(dbResult == '') {
//           res.status(200).json('Order not found');
//         }
//         else {
//           res.status(200).json({Status: dbResult});
//         }
//       }
//     });
// });

// // Get all customer orders by userId
// router.get('/',
// function(req, res) {
//   orders.getOrdersByCustomer(req.body,
//   function(err, dbResult) {
//     if(err) {
//       res.status(500).json(err);
//     }
//     else {
//       if(dbResult == '') {
//         res.status(200).json('Orders not found');
//       }
//       else {
//         res.status(200).json({Orders: dbResult});
//       }
//     }
//   });
// });

// // Get all manager orders by userId
// router.get('/',
// function(req, res) {
//   orders.getOrdersByManager(req.body,
//   function(err, dbResult) {
//     if(err) {
//       res.status(500).json(err);
//     }
//     else {
//       if(dbResult == '') {
//         res.status(200).json('Orders not found')
//       }
//       else {      
//         res.status(200).json({Orders: dbResult});
//       }

//     }
//   });
// });

// // Get all restaurant orders by restaurantId
// router.get('/restaurant/:restaurantId',
// function(req, res) {
//   orders.getOrdersByRestaurant(req.params.restaurantId, req.body,
//   function(err, dbResult) {
//     if(err) {
//       res.status(500).json(err);
//     }
//     else {
//       if(dbResult == '') {
//         res.status(200).send('Orders not found');
//       }
//       else {      
//         res.status(200).json({Orders: dbResult});
//       }

//     }
//   });
// });

// router.post('/',
// function(req, res) {
//   orders.addOrder(req.body,
//     function(err) {
//       if(err) {
//         res.status(500).json(err);
//       }
//       else {
//         res.status(201).json({Status: 'Order created'});
//         orders.addDetailedOrder(req.body,
//           function(err) {
//             if(err) {
//               res.status(400).json(err);
//             }
//             else {
//               res.status(201).json({Status: 'Extra details created'});
//             }
//           });
//       }
//     })
// })

module.exports = router;
