const db = require('../lib/database.js');

const orders = {

    getOrderById: function(id, userId, callback) {
        return db.query("select * from orders where idorders=? AND users_idusers=?", [id, userId.userId], callback);
    },

    getOrderByCustomer: function(userId, callback) {
        return db.query("select * from orders where users_idusers=?", [userId.userId], callback);
    },

    getOrderByManager: function(userId, callback) {
        return db.query("select * from orders where users_idusers=?", [userId.userId], callback);
    },

    getOrderByRestaurant: function(restaurantId, userId, callback) {
        return db.query("select * from orders where restaurants_idrestaurants=? AND users_idusers=?", [restaurantId, userId.userId], callback);
    }
    
}

module.exports = orders;