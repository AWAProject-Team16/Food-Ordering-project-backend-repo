const db = require('../lib/database');

const restaurants = {

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