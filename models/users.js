const db = require('../lib/database.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const users = {


  newUserRegister: function(info, callback) {
    
    bcrypt.hash(info.password, 10, function(err, hash) {
      return db.query("insert into users (username, name, password, address, email, account_type, phonenumber) Values (?,?,?,?,?,?,?)", 
      [info.username, info.name, hash, info.address, info.email, info.account_type, info.phonenumber], callback);
    });
 
    
},

  getUserById(id, callback) {
    return db.query('select idusers, username, name, address, email, account_type, phonenumber from users \
    where idusers=?', [id], callback);
  }


}

module.exports = users;