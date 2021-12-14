const db = require("../lib/database.js");

const categories = {
  getRestaurantCategories: function (id, callback) {
    return db.query("select * from categories where restaurants_idrestaurants = ?", [id], callback);
  },

  getMyCategories: function (userId, callback) {
    return db.query(
      "select c.*, r.name as restaurant_name \
      from categories c inner join restaurants r on c.restaurants_idrestaurants = r.idrestaurants \
      inner join users u on r.users_idusers = u.idusers \
      where u.idusers = ? \
      order by c.category_name",
      [userId],
      callback
    );
  },

  checkPermissions: function (userId, restaurantId, callback) {
    return db.query(
      "select account_type, restaurants.idrestaurants from users JOIN restaurants ON users.idusers = restaurants.users_idusers where idusers = ? AND idrestaurants = ?",
      [userId, restaurantId],
      callback
    );
  },

  addCategory: function (restaurantId, info, callback) {
    return db.query(
      "insert into categories (restaurants_idrestaurants, category_name) values (?, ?)",
      [restaurantId, info.name],
      callback
    );
  },

  renameCategory: function (userId, restaurantId, categoryId, info, callback) {
    return db.query(
      "UPDATE categories JOIN restaurants ON categories.restaurants_idrestaurants = restaurants.idrestaurants set category_name=?  \
        where idcategories = ? AND restaurants_idrestaurants=? AND users_idusers=?",
      [info.name, categoryId, restaurantId, userId],
      callback
    );
  },

  deleteCategory: function (userId, restaurantId, categoryId, callback) {
    return db.query(
      "delete categories from categories JOIN restaurants ON categories.restaurants_idrestaurants = restaurants.idrestaurants \
        where idcategories = ? AND restaurants_idrestaurants=? AND users_idusers=?",
      [categoryId, restaurantId, userId],
      callback
    );
  },

  // Added by Thuc
  getCategoryWithRestaurantNameByCategoryId: function (idusers, idcategories, callback) {
    return db.query(
      "SELECT categories.*, restaurants.name as restaurant_name FROM categories INNER JOIN restaurants \
        ON categories.restaurants_idrestaurants = restaurants.idrestaurants \
        WHERE users_idusers = ? AND idcategories = ?",
      [idusers, idcategories],
      callback
    );
  },
};

module.exports = categories;
