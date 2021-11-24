const express = require('express');
const router = express.Router();
const users = require('../models/users');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const db = require('../lib/database.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { request } = require('express');
const { session } = require('passport');
const auth = require('../lib/passportAuth');

router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize());


router.get('/login', passport.authenticate('basic', {session: false}), (req, res) => {
  users.getUserData(req.user,
    function(err, dbResult) {
      if(err) {
        res.json(err);
      }
      else {
        res.redirect(dbResult);
      }
    });
});

// router.get('/user', passport.authenticate('basic', {session: false}), (req, res) => {
//   users.getUserData(req.user,
//     function(err, dbResult) {
//       if(err) {
//         res.json(err);
//       }
//       else {
//         res.json(dbResult);
//       }
//     });
// });

// router.get('/logout', function(req, res) {
//   passport.use('null', 'null');
//   res.redirect('/users/login');
// });


router.post('/register', function(req, res) {
  users.newUserRegister(req.body,
    function(err, dbResult) {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(201).json({Status: 'Registration success'});
      }
  });
});


// // router.get('/id/:'+request.user, passport.authenticate('basic', {session: false}), (req, res) => {
// //   users.getUserData(
// //     function(err, dbResult) {
// //       if(err) {
// //         res.json(err);
// //         console.log(request.user);
// //       }
// //       else {
// //         res.status(200).json({User: dbResult});
// //         console.log(request.user);
// //       }
// //     });
// // });


// router.post('/register',
// function(req, res) {
//   users.newUserRegister(req.body,
//     function(err, dbResult) {
//       if(err) {
//         res.json(err);
//       }
//       else {
//         res.status(201).json({status: ['201, Registration successful']})
//       }
//     });
// });

// /*
// // router.post('/register', (req, res) => {
// //   const {username, password, name, address, email, account_type} = req.body;
// //   users.getById(idmember, (err, dbResult) => {
// //     if (err) {
// //       console.log(err);
// //       err.json({success: false});
// //     } else {
// //       res.json({
// //         'success': true,
// //         totalMembers: dbResult.length,
// //         members: dbResult
// //       }
// //       );
// //     }
// //   });
// // });


//       passport.deserializeUser(async (id, done) =>{
//         try {
//           users.getById(id, (err, dbResult) =>{
//             if (err) {
//               return done(err);
//             } else {
//               const user = dbResult[0];
//               return done(null, user);
//             }
//           });
//         } catch (error) {
//           return done(error);
//         }
//       })
//     } catch (error) {
//       return done(error);
//     }
//   }
// ));


// // router.get('/search', (req, res) => {
// //   const {idmember} = req.query;
// //   users.getByIdmember(idmember, (err, dbResult) => {
// //     if (err) {
// //       console.log(err);
// //       err.json({success: false});
// //     } else {
// //       res.json({
// //         'success': true,
// //         totalMembers: dbResult.length,
// //         members: dbResult
// //       }
// //       );
// //     }
// //   });
// // });

// router.post('/register', async (req, res) => {
//   let {email, account_type, username, password} = req.body

//   if (!isEmailValid(email)) {
//     return res.json({status: 401, message: 'Invalid email. Registration failed.'});
//   }

//   if (!utils.isAccountTypeValid(account_type)) {
//     return res.json({status: 402, message: 'Invalid account type. Registration failed.'});
//   }

//   if (!isPasswordStrong(password)) {
//     return res.json({status: 405, message: 'Weak password. Registration failed.'});
//   }

//   account_type = utils.convertAccountTypeToNumber(account_type);
//   const newUser = {email, account_type, username, password};

//   // const _isUsernameExist = await isUsernameExist(username);console.log('username: ', username);console.log('_isUsernameExist: ', _isUsernameExist)
//   // if (_isUsernameExist) {
//   //   res.json({status: 406, message: 'This username is not available. Please choose another one.'});
//   //   return
//   // }

//   users.add(newUser, (err) => {
//     if (err) {
//       console.log(err);
//       if (err.errno == 1062) {  //duplicate entry for any unique fields
//         if (err.sqlMessage.includes('username_UNIQUE')) {
//           return res.json({status: 406, message: 'Username already in use. Please choose others.'});
//         }

//         if (err.sqlMessage.includes('email_UNIQUE')) {
//           return res.json({status: 407, message: 'Email already in use. Please choose others.'});
//         }
//       } else {
//         return res.json({status: 403, message: 'Error occures. Please contact the website administrator.'});
//       }
//     } else {
//       return res.json({status: 200, message: 'You have successfully registered. You can log in now.'});
//     }
//   })
// });

// // router.post("/login", passport.authenticate('local', {
// //   successRedirect: "/dashboard",
// //   failureRedirect: "/login",
// // }));

// // router.post("/login", passport.authenticate('local'), (req, res) => {
// //   console.log('LOGIN ĐÚNG NÀ')
// //   console.log(req.session)
// //   res.json({status: 200, message: 'Login successfully for user: ' + req.user.username})
// // });

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {return next(err);}
//     if (!user) {return res.json({status: 403, message: 'Invalid username or password'});}

//     req.login(user,  (err) => {
//       if (err) {return next(err);}
//       return res.json({
//         status: 200, 
//         message: 'Login successfully for user: ' + req.user.username,
//         session_id: req.sessionID,
//       });
//     });
//   })(req, res, next);
// });

// router.get('/logout', (req, res) => {
//   console.log(req.session)
//   req.logOut();
//   res.send('Logout successfully')
//   // users.logout(session_id, (err, dbResult) => {
//   //   if (err) {
//   //     console.log(err);
//   //     res.json({success: false});
//   //   } else {
//   //     res.json({
//   //       'success': true,
//   //       totalMembers: dbResult.length,
//   //       members: dbResult
//   //     }
//   //     );
//   //   }
//   // });
// });

// // // NEW
// // router.put('/', upload.single('image'), (req, res) => {
// //   if (req.file) {
// //     req.body.image = req.file.filename;
// //     users.update1(req.query.idmember, req.body, (err, dbResult) => {
// //       if (err) {
// //         console.log(err);
// //         res.json({success: false});
// //       } else {
// //         res.json(dbResult);
// //       }
// //     });
// //   }
// //   else {
// //     users.update2(req.query.idmember, req.body, (err, dbResult) => {
// //       if (err) {
// //         console.log(err);
// //         res.json({success: false});
// //       } else {
// //         res.json(dbResult);
// //       }
// //     });
// //   }
// // });

// const isEmailValid = email => {
//   const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return regex.test(String(email).toLowerCase());
// }

// const isPasswordStrong = password => {
//   //Have lowercase letters, uppercase letters, numbers, special chars, and at least 12 chars
//   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/;
//   return regex.test(password);
// }

// // const isUsernameExist = async username => {
// //   let rv = false;
// //   await users.getByUsername(username, (err, dbResult) => {console.log('username: ', username)
// //     if (err) {
// //       console.log(err);
// //       return undefined;
// //     } else {
// //       rv =  dbResult.length > 0;console.log('rv: ', rv)
// //     }
// //   })
// //   return rv;
// // }

// */

module.exports = router;
