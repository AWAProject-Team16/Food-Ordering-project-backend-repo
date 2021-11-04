const db = require('../database.js');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const users = {
  // getByEmailaddress: (emailaddress, callback) => {
  //   db.query('select * from `member` where emailaddress=?',
  //     [emailaddress],
  //     callback);
  // },

  // get: (emailaddress, password, callback) => {
  //   db.query('select idmember, firstname, lastname, emailaddress, address, phonenumber, image from `member` where emailaddress=? and password=?',
  //     [emailaddress, password],
  //     callback);
  // },

  // getAll: (callback) => {
  //   db.query('select idmember, firstname, lastname, emailaddress, address, phonenumber, image from `member`',
  //     callback);
  // },

  // getById: (idmember, callback) => {
  //   db.query('select idmember, firstname, lastname, emailaddress, address, phonenumber, image from `member` where idmember=?',
  //     [idmember],
  //     callback);
  // },

  add: (member, callback) => {
    bcrypt.hash(member.password, saltRounds, function (err, hash) {
      return db.query('insert into `users`(username, password, name, address, email, account_type) values(?, ?, ?, ?, ?, ?)',
        [member.username, hash, member.name, member.address, member.email, member.account_type],
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