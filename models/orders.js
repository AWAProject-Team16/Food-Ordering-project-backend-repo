const db = require('../lib/database.js');

const orders = {
    getOrderById: function(orderId, callback) {
        return db.query("select * from orders where orderId=?", [orderId], callback);
    },

    getOrderByCustomer: function(userId, callback) {
        return db.query("select * from orders where users_idusers=?", [userId], callback);
    },

    getOrderByManager: function(userId, callback) {
        return db.query("select * from orders where users_idusers=?", [userId], callback);
    },

    getOrderByRestaurant: function(restaurantId, callback) {
        return db.query("select * from orders where restaurants_idrestaurants=?", [restaurantId], callback);
    }
}

module.exports = orders;