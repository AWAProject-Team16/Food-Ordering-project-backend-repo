const db = require('../lib/database');

const restaurants = {

  getAllRestaurants: function(callback) {
    return db.query("select idrestaurants, image, name, address, restaurant_type, operating_hours, price_level from restaurants", callback);
  },

  getManagerRestaurants: function(userId, callback) {
    return db.query("select * from restaurants join users ON \
    restaurants.users_idusers = users.idusers where idusers=? AND account_type = 'manager'", [userId], callback);
  },

  createRestaurant: function(settings, callback) {
    return db.query("insert into restaurants (idrestaurants, name, address, image, \
    restaurant_type, operating_hours, price_level, restaurant_Description, users_idUsers) VALUES (?,?,?,?,?,?,?,?,?)",
    [settings.idrestaurants, settings.name, settings.address, settings.image, settings.restaurant_type, 
     settings.operating_hours, settings.price_level, settings.restaurant_Description, settings.users_idUsers], callback);
  }

 




  // add: function(message, callback) {
  //   return db.query(
  //     'insert into message (idmember, idreceiver, message, idbook, time) values(?, ?, ?, ?, now())',
  //     [parseInt(message.idmember), parseInt(message.idreceiver), message.message, message.idbook],
  //     callback
  //   );
  // }
};

module.exports = restaurants;