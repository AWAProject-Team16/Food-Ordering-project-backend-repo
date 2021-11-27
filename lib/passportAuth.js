const express = require('express');
const users = require('../models/users');
const bcrypt = require('bcryptjs');
const db = require('../lib/database.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { request } = require('express');
const { session } = require('passport');
const router = express.Router();
const jwtk = require('../bin/www');

const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;




router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize());


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;





passport.use(new Strategy((username, password, u) => {

    var errMessage = 'Incorrect username or password'
    db.query('SELECT idusers, account_type, username, password FROM users WHERE username = ?', [username]).then(dbResults => {
  
      var user = dbResults[0]['idusers'];
  
      if(dbResults.length == 0)
      { return u(null, false, {message: errMessage}) }
  
      bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
        if(bcryptResult == true) { return u(null, user) }
        else { return u(null, false, {message: errMessage}) }
      });
    }).catch(err => u(null));
  
}));


let jwtSecretKey = null;
if(process.env.jwtk === undefined) {
  // db.query('SELECT secretKey from users where idusers = ?', [req.user].then(dbResults => {
  //   jwtSecretKey = dbResults[0]['password'];
  // }));

  jwtSecretKey = "Test1";
}
else {
  jwtSecretKey = process.env.jwtk;
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey
}


passport.use(new JwtStrategy(options, function(jwt_payload, u) {


    return u(null, jwt_payload);


}));