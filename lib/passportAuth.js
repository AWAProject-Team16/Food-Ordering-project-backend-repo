const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../lib/database.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();

const passport = require("passport");
const Strategy = require("passport-http").BasicStrategy;

router.use(bodyParser.json());
router.use(cors());
router.use(passport.initialize());

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new Strategy((username, password, done) => {
    const errMessage = "Incorrect username or password";

    db.query(
      "SELECT idusers, account_type, username, password, name FROM users WHERE username = ?",
      [username],
      (err, dbResults) => {
        if (err) {
          console.error(err);
          return done(null);
        }

        const user = dbResults[0]["idusers"];
        const account_type = dbResults[0]["account_type"];
        const name = dbResults[0]["name"];

        if (dbResults.length == 0) {
          return done(null, false, { message: errMessage });
        }

        bcrypt.compare(password, dbResults[0].password).then((bcryptResult) => {
          if (bcryptResult == true) {
            console.log("xxx", { user, account_type, name });
            return done(null, { user, account_type, name });
          } else {
            return done(null, false, { message: errMessage });
          }
        });
      }
    );
  })
);

require("dotenv").config();
let jwtSecretKey = process.env.secret;

if (jwtSecretKey == undefined) {
  console.error("Error with secretKey");
}

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

passport.use(
  new JwtStrategy(options, function (jwt_payload, done) {
    return done(null, jwt_payload);
  })
);

module.exports = Strategy;
