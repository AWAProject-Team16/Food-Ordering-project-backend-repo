const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const users = require('../models/users');

let authorization = (app, passport) => {
  app.use(session({
    secret: ".xv8e:.]pLnsx9(!",
    resave: false,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  authUser = (username, password, done) => {
    users.login(username, (err, dbResult) => {
      if (err) {
        console.log(err);
        return done(err);
      } else {  //no err
        if (dbResult.length > 0) {
          authenticatedUser = dbResult[0];
          bcrypt.compare(password, authenticatedUser.password, (err, compareResult) => {
            if (compareResult) {  //correct pw
              return done(null, authenticatedUser);
            } else {  //wrong pw
              return done(null, false);
            }
          })
        } else {  //dbResult.length == 0
          return done(null, false);
        }
      }
    })
  }

  passport.use(new LocalStrategy(authUser));

  passport.serializeUser((userObj, done) => {
    console.log(userObj);
    done(null, userObj);
  });

  passport.deserializeUser((userObj, done) => {
    done(null, userObj);
  });

  checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('CHUA LOGIN')
      console.log(req.session.passport)
      return next()
    }

    res.redirect("/login");
  };
}

module.exports = authorization;