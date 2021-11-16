const db = require('../lib/database.js');
const bcrypt = require('bcryptjs');

const saltRounds = 10;





const users = {


  getUserData: function(userId, callback) {
    return db.query("select username, name, address, email, account_type from users where idusers = ?", [userId], callback);
  },


  login: (username, callback) => {
    db.query('select * from `users` where username=?',
      [username],
      callback);
  },



  logout: (session_id, callback) => {
    console.log("later")
  },

  // get: (emailaddress, password, callback) => {
  //   db.query('select idmember, firstname, lastname, emailaddress, address, phonenumber, image from `member` where emailaddress=? and password=?',
  //     [emailaddress, password],
  //     callback);
  // },

  // getAll: (callback) => {
  //   db.query('select idmember, firstname, lastname, emailaddress, address, phonenumber, image from `member`',
  //     callback);
  // },

  getById: (idusers, callback) => {
    db.query('select username, name, address, email, account_type from `users` where idusers=?',
      [idusers],
      callback);
  },

  getByUsername: (username, callback) => {
    db.query('select username from `users` where username=?',
      [username],
      callback
      );
  },

  getByEmail: (email, callback) => {
    db.query('select email from `users` where email=?',
      [email],
      callback);
  },

  add: (user, callback) => {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      return db.query('insert into `users`(username, password, name, address, email, account_type) values(?, ?, ?, ?, ?, ?)',
        [user.username, hash, user.name, user.address, user.email, user.account_type],
        callback);
    });
  },

  // update1: function (idmember, member, callback) {
  //   return db.query(
  //     'update `member` set image=? where idmember=?',
  //     [member.image, idmember],
  //     callback
  //   );
  // },

  // update2: function (idmember, member, callback) {
  //   return db.query(
  //     'update `member` set firstname=?, lastname=?, emailaddress=?, address=?, phonenumber=? where idmember=?',
  //     [member.firstname, member.lastname, member.emailaddress, member.address, member.phonenumber, idmember],
  //     callback
  //   );
  // },
}

module.exports = users;