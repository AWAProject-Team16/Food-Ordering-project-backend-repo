const db = require('../lib/database.js');

const categories = {

    // getAllCategories: function(callback) {
    //     return db.query('select * from categories');
    // },

    getRestaurantCategories: function(restaurantId, callback) {
        return db.query('select * from categories where restaurant_idrestaurants = ?', [restaurantId], callback);
    },

    addCategory: function(info, callback) {
        return db.query('insert into categories (restaurants_idrestaurants, category_name) values (?, ?)', [info.restaurantId, info.name], callback);
    },

    deleteCategory: function(id, callback) {
        return db.query('delete from categories where idcategories = ?', [id.categoryId], callback);
    }

}

module.exports = categories;