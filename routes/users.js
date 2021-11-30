const express = require('express');
const router = express.Router();
const users = require('../models/users');

const passport = require('passport');
const Strategy = require('../lib/passportAuth.js');

const cors = require('cors');
const bodyParser = require('body-parser');
const { request } = require('express');
const { session } = require('passport');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize());


require('dotenv').config();
let jwtSecretKeyLogin = process.env.secret;
router.post('/login', passport.authenticate('basic', {session: false}), (req, res) => {

  const payload = {
    user : req.user
  };

  const options = {
  };

  const token = jwt.sign(payload, jwtSecretKeyLogin, options);
  console.log(jwtSecretKeyLogin);
  res.json({ token });

})


router.post('/register', function(req, res) {


  users.newUserRegister(req.body,
    function(err, dbResult) {
      if(err) {
        res.status(400).json('err');
      }
      else {
        res.status(201).json({Status: 'Registration success'});
      }
  });

});


module.exports = router;
