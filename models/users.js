const db = require('../lib/database.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const users = {

  getUsers: function(callback) {
    return db.query("select * from users", callback);
  },
  
  getUserData: function(id, callback) {
    return db.query("select username, name, address, email, account_type from users where idusers = ?", [id.userId], callback);
  },

  newUserRegister: function(info, callback) {
    bcrypt.hash(info.password, 10, function(err, hash) {
      return db.query("insert into users (username, name, password, address, email, account_type) Values (?,?,?,?,?,?)", 
      [info.username, info.name, hash, info.address, info.email, info.account_type], callback);
  });
}

//   get: (emailaddress, password, callback) => {
//     db.query('select idmember, firstname, lastname, emailaddress, address, phonenumber, image from `member` where emailaddress=? and password=?',
//       [emailaddress, password],
//       callback);
//   },

//   getAll: (callback) => {
//     db.query('select idmember, firstname, lastname, emailaddress, address, phonenumber, image from `member`',
//       callback);
//   },

//   getById: (idusers, callback) => {
//     db.query('select username, name, address, email, account_type from `users` where idusers=?',
//       [idusers],
//       callback);
//   },

//   getByUsername: (username, callback) => {
//     db.query('select username from `users` where username=?',
//       [username],
//       callback
//       );
//   },

//   getByEmail: (email, callback) => {
//     db.query('select email from `users` where email=?',
//       [email],
//       callback);
//   },

//   add: (user, callback) => {
//     bcrypt.hash(user.password, saltRounds, function (err, hash) {
//       return db.query('insert into `users`(username, password, name, address, email, account_type) values(?, ?, ?, ?, ?, ?)',
//         [user.username, hash, user.name, user.address, user.email, user.account_type],
//         callback);
//     });
//   },

//   update1: function (idmember, member, callback) {
//     return db.query(
//       'update `member` set image=? where idmember=?',
//       [member.image, idmember],
//       callback
//     );
//   },

//   update2: function (idmember, member, callback) {
//     return db.query(
//       'update `member` set firstname=?, lastname=?, emailaddress=?, address=?, phonenumber=? where idmember=?',
//       [member.firstname, member.lastname, member.emailaddress, member.address, member.phonenumber, idmember],
//       callback
//     );
//   },

}

module.exports = users;