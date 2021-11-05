const express = require('express');
const router = express.Router();
const users = require('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy({passReqToCallback: true},
//   async (req, username, password, done) => {
//     try {
//       users.login(username, (err, dbResult) => {
//         if (err) {
//           return done(err);
//         } else {
//           if (dbResult.length > 0) {
//             bcrypt.compare(password, dbResult[0].password, (err, compareResult) => {
//               if (compareResult) {
//                 // res.json({
//                 //   status: 200,
//                 //   message: 'Login successfully [server-side redirecting available]',
//                 //   token: '[Implement later]',
//                 //   session_id: '[Implement later]',
//                 // });
//                 return done(null, dbResult[0]);
//               } else {
//                 console.log('Wrong password');
//                 // res.json({status: 403, message: 'Invalid username and/or password'});
//                 req.session.messages.push({text: 'Invalid username or password', type: 'danger'});
//                 return done(null, false);
//               }
//             });
//           } else {
//             console.log("user does not exists");
//             // res.json({status: 403, message: 'Invalid username and/or password'});
//             req.session.messages.push({text: 'Invalid username or password', type: 'danger'});
//             return done(null, false);
//           }
//         }
//       });

//       passport.serializeUser((user, done) => {
//         done(null, dbResult[0].idusers)
//       });

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

// router.post('/register', (req, res) => {
//   const {username, password, name, address, email, account_type} = req.body;
//   users.getById(idmember, (err, dbResult) => {
//     if (err) {
//       console.log(err);
//       err.json({success: false});
//     } else {
//       res.json({
//         'success': true,
//         totalMembers: dbResult.length,
//         members: dbResult
//       }
//       );
//     }
//   });
// });

// router.get('/search', (req, res) => {
//   const {idmember} = req.query;
//   users.getByIdmember(idmember, (err, dbResult) => {
//     if (err) {
//       console.log(err);
//       err.json({success: false});
//     } else {
//       res.json({
//         'success': true,
//         totalMembers: dbResult.length,
//         members: dbResult
//       }
//       );
//     }
//   });
// });

router.post('/register', (req, res) => {
  users.add(req.body, (err) => {
    if (err) {
      console.log(err);
      if (err.errno == 1062) {
        res.json({status: 403, message: 'This email address is not available. Please choose another one.'})
      } else {
        res.json({status: 403, message: 'Error occures. Please contact the website administrator.'})
      }
    } else {
      res.json({status: 200, message: 'You have successfully registered. You can log in now.'});
    }
  })
});

// router.post("/login", passport.authenticate('local', {
//   successRedirect: "/dashboard",
//   failureRedirect: "/login",
//   failureFlash: true
// }));
router.post("/login", passport.authenticate('local'), (req, res) => {
  console.log('LOGIN ĐÚNG NÀ')
  console.log(req.session)
  res.send('Login successfully')
});



router.get('/logout', (req, res) => {
  console.log(req.session)
  req.logOut();
  res.send('Logout successfully')
  // users.logout(session_id, (err, dbResult) => {
  //   if (err) {
  //     console.log(err);
  //     res.json({success: false});
  //   } else {
  //     res.json({
  //       'success': true,
  //       totalMembers: dbResult.length,
  //       members: dbResult
  //     }
  //     );
  //   }
  // });
});

// // NEW
// router.put('/', upload.single('image'), (req, res) => {
//   if (req.file) {
//     req.body.image = req.file.filename;
//     users.update1(req.query.idmember, req.body, (err, dbResult) => {
//       if (err) {
//         console.log(err);
//         res.json({success: false});
//       } else {
//         res.json(dbResult);
//       }
//     });
//   }
//   else {
//     users.update2(req.query.idmember, req.body, (err, dbResult) => {
//       if (err) {
//         console.log(err);
//         res.json({success: false});
//       } else {
//         res.json(dbResult);
//       }
//     });
//   }
// });

module.exports = router;
