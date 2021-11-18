const db = require('../lib/database');

const restaurants = {

  getAllRestaurants: function(callback) {
    return db.query("select idrestaurants, users_idusers, image, name, address, restaurant_type, operating_hours, price_level from restaurants", callback);
  },

  // getManagerRestaurants: function(id, callback) {
  //   return db.query("select * from restaurants join users ON \
  //   restaurants.users_idusers = users.idusers where idusers=? AND account_type = 2", [userId], callback);
  // },

  getRestaurantById: function(id, callback) {
    return db.query("select * from restaurants where idrestaurants=?", [id], callback);
  },

  createRestaurant: function(settings, callback) {
    return db.query("insert into restaurants (name, address, image, \
    restaurant_type, operating_hours, price_level, restaurant_Description, users_idUsers) VALUES (?,?,?,?,?,?,?,?)",
    [settings.name, settings.address, settings.image, settings.restaurant_type, 
     settings.operating_hours, settings.price_level, settings.restaurant_Description, settings.users_idUsers], callback);
  },
  
};

module.exports = restaurants;