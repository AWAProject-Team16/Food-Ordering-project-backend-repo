const db = require("../lib/database.js");

const products = {
  getAllProducts: function (id, callback) {
    return db.query(
      "select idproducts, categories_idcategories, category_name, product_name, product_description, product_cost, product_image from products join categories on products.categories_idcategories = categories.idcategories \
        where restaurants_idrestaurants = ?",
      [id],
      callback
    );
  },

  getProductById: function (id, callback) {
    return db.query("select * from products where idproducts = ?", [id], callback);
  },

  getProductByCategory: function (id, callback) {
    return db.query("select * from products where categories_idcategories = ?", [id], callback);
  },

  getMyProducts: function (userId, callback) {
    return db.query(
      "select p.* from products p inner join categories c on p.categories_idcategories = c.idcategories \
        inner join restaurants r on c.restaurants_idrestaurants = r.idrestaurants \
        inner join users u on u.idusers = r.users_idusers \
        where u.idusers = ?",
      [userId],
      callback
    );
  },

  checkPermissions: function (userId, categoryId, callback) {
    return db.query(
      "select account_type, categories.idcategories from users JOIN restaurants ON users.idusers = restaurants.users_idusers \
        JOIN categories ON restaurants.idrestaurants = categories.restaurants_idrestaurants where idusers = ? AND idcategories = ?",
      [userId, categoryId],
      callback
    );
  },

  addProduct: function (categoryId, info, callback) {
    return db.query(
      "insert into products (categories_idcategories, product_name, product_description, product_cost, product_image) values (?,?,?,?,?)",
      [categoryId, info.name, info.description, info.cost, info.image],
      callback
    );
  },

  // Added by Thuc
  addProductMultipart: function (categoryId, info, callback) {
    return db.query(
      "insert into products (categories_idcategories, product_name, product_description, product_cost, product_image) values (?,?,?,?,?)",
      [categoryId, info.product_name, info.product_description, info.product_cost, info.product_image],
      callback
    );
  },

  editProduct: function (userId, categoryId, productId, info, callback) {
    return db.query(
      "UPDATE products JOIN categories ON products.categories_idcategories = categories.idcategories JOIN restaurants ON\
        categories.restaurants_idrestaurants = restaurants.idrestaurants set product_name=?, product_description=?, product_cost=?, product_image=? \
        where idproducts =? AND categories_idcategories = ? AND users_idusers=?",
      [info.name, info.description, info.cost, info.image, productId, categoryId, userId],
      callback
    );
  },

  editProductNoCategory: function (userId, productId, info, callback) {
    return db.query(
      "UPDATE products JOIN categories ON products.categories_idcategories = categories.idcategories JOIN restaurants ON\
        categories.restaurants_idrestaurants = restaurants.idrestaurants set product_name=?, product_description=?, product_cost=?, product_image=? \
        where idproducts =? AND users_idusers=?",
      [info.name, info.description, info.cost, info.image, productId, userId],
      callback
    );
  },

  // Added by Thuc
  editProductNoCategoryMultipart: function (userId, productId, info, callback) {
    if (info.product_image) {
      return db.query(
        "UPDATE products JOIN categories ON products.categories_idcategories = categories.idcategories \
                    JOIN restaurants ON categories.restaurants_idrestaurants = restaurants.idrestaurants \
                    set product_name=?, product_description=?, product_cost=?, product_image=? \
                    where idproducts =? AND users_idusers=?",
        [info.product_name, info.product_description, info.product_cost, info.product_image, productId, userId],
        callback
      );
    } else {
      return db.query(
        "UPDATE products JOIN categories ON products.categories_idcategories = categories.idcategories \
                    JOIN restaurants ON categories.restaurants_idrestaurants = restaurants.idrestaurants \
                    set product_name=?, product_description=?, product_cost=? \
                    where idproducts =? AND users_idusers=?",
        [info.product_name, info.product_description, info.product_cost, productId, userId],
        callback
      );
    }
  },

  deleteProduct: function (userId, categoryId, productId, callback) {
    return db.query(
      "delete products from products JOIN categories ON products.categories_idcategories = categories.idcategories \
        JOIN restaurants ON categories.restaurants_idrestaurants = restaurants.idrestaurants \
        where idproducts = ? AND idcategories = ? AND users_idusers = ?",
      [productId, categoryId, userId],
      callback
    );
  },
};

module.exports = products;
