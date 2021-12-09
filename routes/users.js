const express = require("express");
const router = express.Router();
const users = require("../models/users");

const passport = require("passport");
const Strategy = require("../lib/passportAuth.js");
const db = require("../lib/database.js");

const cors = require("cors");
const bodyParser = require("body-parser");
const { request } = require("express");
const { session } = require("passport");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());
router.use(cors());
router.use(passport.initialize());

require("dotenv").config();
let jwtSecretKeyLogin = process.env.secret;
router.post(
  "/login",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    const payload = {
      idusers: req.user.user,
      account_type: req.user.account_type,
      name: req.user.name,
    };

    const options = {};

    const token = jwt.sign(payload, jwtSecretKeyLogin, options);
    res.json({ token });
  }
);

router.post("/register", function (req, res) {
  users.newUserRegister(req.body, function (err, dbResult) {
    if (err) {
      res.status(400).json("err");
    } else {
      res.status(201).json({ Status: "Registration success" });
    }
  });
});

// Get user information by id. Added by Thuc
router.get(
  "/myinfo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users.getUserById(req.user.idusers, (err, dbResult) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else res.json(dbResult);
    });
  }
);

// Get total revenue, total orders, total customers from all restaurants (for a manager). Customer -> return empty
router.get(
  "/totalRevenueOrdersCustomersForManager",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users.getTotalRevenueOrdersCustomersForManager(
      req.user.idusers,
      (err, dbResult) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else res.json(dbResult[0]);
      }
    );
  }
);

// Most 4 popular days for manager (based on the number of orders)
router.get(
  "/most4PopularDaysForManager",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users.getMost4PopularDaysForManager(req.user.idusers, (err, dbResult) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else res.json(dbResult);
    });
  }
);

// Most 6 popular time for manager (based on the number of orders)
router.get(
  "/most6PopularTimeForManager",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users.getMost6PopularTimeForManager(req.user.idusers, (err, dbResult) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else res.json(dbResult);
    });
  }
);

// Most 3 popular ordered foods for manager (based on the number of orders)
router.get(
  "/most3PopularProductsForManager",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users.getMost3PopularProductsForManager(
      req.user.idusers,
      (err, dbResult) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else res.json(dbResult);
      }
    );
  }
);

// Number of restaurants for manager
router.get(
  "/totalRestaurants",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users.getTotalRestaurants(req.user.idusers, (err, dbResult) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else res.json(dbResult[0]);
    });
  }
);

module.exports = router;
