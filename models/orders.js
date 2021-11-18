const db = require('../lib/database.js');

const orders = {

    getOrderById: function(id, callback) {
        return db.query("select * from orders where idorders=?", [id.idorders], callback);
    },

    getOrderByCustomer: function(id, callback) {
        return db.query("select * from orders where users_idusers=?", [id.userId], callback);
    },

    getOrderByManager: function(id, callback) {
        return db.query("select * from orders where users_idusers=?", [id.userId], callback);
    },

    getOrderByRestaurant: function(id, callback) {
        return db.query("select * from orders where restaurants_idrestaurants=?", [id.restaurantId], callback);
    }
    
}

module.exports = orders;