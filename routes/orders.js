const express = require("express");
const router = express.Router();
const orders = require("../models/orders.js");
const db = require("../lib/database.js");

const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(cors());
router.use(passport.initialize());

router.post("/ordersHistory", passport.authenticate("jwt", { session: false }), function (req, res) {
  orders.getUserOrders(req.user.idusers, function (err, dbResult) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (dbResult == "") {
        res.status(400).json({ Status: 400 + ", Orders not found" });
      } else {
        res.status(200).json({ Orders: dbResult });
      }
    }
  });
});

// Get orders for a customer or manager. Added by Thuc
router.get("/myOrdersPlusNames", passport.authenticate("jwt", { session: false }), function (req, res) {
  orders.getMyOrdersPlusNames(req.user, function (err, dbResult) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(dbResult);
    }
  });
});

// Gets order details (what products was ordered and its' costs). For both managers and customers
router.post("/orderId/:idorders", passport.authenticate("jwt", { session: false }), function (req, res) {
  orders.getOrderDetails(req.user, req.params.idorders, function (err, dbResult) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (dbResult.lenght == 0) {
        res.status(400).json({ Status: 400 + ", Order Id does not exist" });
      } else {
        res.status(200).json(dbResult);
      }
    }
  });
});

router.post("/restaurant/:idrestaurants", passport.authenticate("jwt", { session: false }), function (req, res) {
  orders.getRestaurantOrders(req.user.idusers, req.params.idrestaurants, function (err, dbResult) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (dbResult == "") {
        res.status(400).json({ Status: 400 + ", Orders not found" });
      } else {
        res.status(200).json({ Orders: dbResult });
      }
    }
  });
});

router.post("/addOrder", passport.authenticate("jwt", { session: false }), function (req, res) {
  orders.addOrder(req.user.idusers, req.body, function (err, dbResult) {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      if (dbResult.affectedRows == 0) {
        res.status(400).json({
          Status: 400 + ", Cannot add order. For help, contact the IT manager",
        });
      } else {
        orders.addOrderDetails(dbResult.insertId, req.body.ShoppingCart, function (err, dbResult) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(201).json({ Status: 201 + ", Order added" });
          }
        });
      }
    }
  });
});

router.post("/updateOrder", passport.authenticate("jwt", { session: false }), function (req, res) {
  orders.checkOrderStatus(req.user.idusers, req.body, function (err, dbResult) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (dbResult[0]["order_status"] == "Closed") {
        res.status(400).json({
          Status: 400 + ", This order cannot be updated because the order is closed. For help, contact the IT manager",
        });
      } else {
        orders.updateOrder(req.user.idusers, req.body, function (err, dbResult) {
          if (err) {
            res.status(500).json(err);
          } else {
            if (dbResult.affectedRows == 0) {
              res.status(400).json({
                Status: 400 + ", Cannot update order. For help, contact the IT manager",
              });
            } else {
              res.status(200).json({
                Status: 200 + ", Order updated to: " + req.body.order_status,
              });
            }
          }
        });
      }
    }
  });
});

// Update order status and estimated time of completion. Added by Thuc
router.post("/updateOrderStatusAndETC", passport.authenticate("jwt", { session: false }), function (req, res) {
  orders.checkOrderStatus(req.user.idusers, req.body, function (err, dbResult) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (dbResult[0]["order_status"] == "Closed") {
        res.status(400).json({
          Status: 400 + ", This order cannot be updated because the order is closed. For help, contact the IT manager",
        });
      } else {
        orders.updateOrderStatusAndETC(req.user.idusers, req.body, function (err, dbResult) {
          if (err) {
            res.status(500).json(err);
          } else {
            if (dbResult.affectedRows == 0) {
              res.status(400).json({
                Status: 400 + ", Cannot update order. For help, contact the IT manager",
              });
            } else {
              res.status(200).json({
                Status: 200 + ", Order updated to: " + req.body.order_status,
              });
            }
          }
        });
      }
    }
  });
});

// Customer confirm an order as delivered. Only allows to change status from 'Delivering' to 'Delivered'
router.get("/confirmDelivered/:idorders", passport.authenticate("jwt", { session: false }), (req, res) => {
  orders.customerConfirmDelivered(req.user.idusers, req.params.idorders, (err, dbResult) => {
    if (err) {
      console.error(err);
    } else {
      if (dbResult.affectedRows == 0) {
        console.log("Updated 0 row => suspicious api call");
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  });
});

router.get("/myLatestOrderDate", passport.authenticate("jwt", { session: false }), (req, res) => {
  orders.getMyLatestOrderDate(req.user, (err, dbResult) => {
    if (err) {
      console.log(err);
      res.sendSatus(500);
    } else {
      console.log("ok");
      res.json(dbResult[0]);
    }
  });
});

module.exports = router;
