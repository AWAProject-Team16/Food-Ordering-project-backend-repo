var express = require('express');
var router = express.Router();
var users = require('../models/users');
const bcrypt = require('bcryptjs');

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

// router.post('/add', (req, res) => {
//   users.add(req.body, (err) => {
//     if (err) {
//       console.log(err);
//       if (err.errno == 1062) {
//         res.json({success: false, message: 'This email address is not available. Please choose another one.'})
//       } else {
//         res.json({success: false, message: 'Error occures. Please contact the website administrator.'})
//       }
//     } else {
//       res.json({success: true, message: 'You have successfully registered. You can log in now.'});
//     }
//   })
// });

// router.post('/login', (req, res) => {
//   const {emailaddress, password, accept} = req.body;

//   if (!emailaddress.trim() || !password.trim()) {
//     console.log("username or password missing");
//     res.json({success: false, message: 'Invalid email and/or password'});
//     return
//   }

//   users.getByEmailaddress(emailaddress, (err, dbResult) => {
//     if (err) {
//       res.json(err);
//     } else {
//       if (dbResult.length > 0) {
//         console.log('x');
//         bcrypt.compare(password, dbResult[0].password, (err, compareResult) => {
//           if (compareResult) {
//             if (!accept) {
//               res.redirect('/member?idmember=' + dbResult[0].idmember);
//             } else if (accept == 'json') {
//               for (let m of dbResult) {
//                 delete m['password'];
//               }
//               res.json(dbResult); console.log(dbResult);
//             }
//           } else {
//             console.log('Wrong password');
//             res.json({success: false, message: 'Invalid email and/or password'});
//           }
//         });

//       } else {
//         console.log("user does not exists");
//         res.json({success: false, message: 'Invalid email and/or password'});
//       }
//     }
//   });

// });

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
