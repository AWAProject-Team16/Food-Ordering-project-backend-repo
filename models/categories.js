const db = require('../lib/database.js');

const categories = {

    getAllCategories: function(callback) {
        return db.query('select * from categories');
    },

    getRestaurantCategories: function(restaurantId, callback) {
        return db.query('select * from categories where restaurant_idrestaurants = ?', [restaurantId], callback);
    }

}

module.exports = categories;