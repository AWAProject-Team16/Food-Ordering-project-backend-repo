const db = require('../lib/database');

const restaurants = {

  allRestaurants: function(callback) {
    return db.query("select idrestaurants, users_idusers, image, name, address, restaurant_type, operating_hours, price_level, restaurant_description, phonenumber from restaurants", callback);
  },
  
  getRestaurantById: function(id, callback) {
    return db.query("select * from restaurants where idrestaurants=?", [id], callback);
  },

  foodCategoryRestaurants: function(type, callback) {
    return db.query("select idrestaurants, users_idusers, image, name, address, restaurant_type, operating_hours, price_level, phonenumber from restaurants where restaurant_type=?", [type], callback);
  },

  getManagerRestaurants: function(userId, callback) {
    return db.query("select idrestaurants, image, restaurants.name, restaurants.address, restaurant_type, operating_hours, \
    price_level, restaurant_description, restaurants.phonenumber from restaurants join users ON \
    restaurants.users_idusers = users.idusers where idusers=? AND account_type = 2", [userId], callback);
  },

  createRestaurant: function(id, settings, callback) {
    return db.query("insert into restaurants (name, address, image, \
    restaurant_type, operating_hours, price_level, restaurant_description, phonenumber, users_idusers) VALUES (?,?,?,?,?,?,?,?,?)",
    [settings.name, settings.address, settings.image, settings.restaurant_type, 
     settings.operating_hours, settings.price_level, settings.restaurant_description, settings.phone, id], callback);
  },
  
  editRestaurant: function(userId, restaurantId, info, callback) {
    return db.query("update restaurants set name=?, address=?, operating_hours=?, image=?, restaurant_type=?, price_level=?, \
    restaurant_description=?, phonenumber=? where users_idusers=? AND idrestaurants=?", [info.name, info.address, info.hours, info.image, info.type,
    info.price, info.description, info.phone, userId, restaurantId], callback);
  },

  deleteRestaurant: function(userId, restaurantId, callback) {
    return db.query("delete from restaurants where users_idusers=? AND idrestaurants=?", [userId, restaurantId], callback);
  },

};

module.exports = restaurants;
