const db = require('../lib/database.js');

const products = {

    getProductById: function(productId, callback) {
        return db.query('select * from products where idproducts = ?', [productId], callback);
    },

    getProductByCategory: function(categoryId, callback) {
        return db.query('select * from products where categories_idcategories = ?', [categoryId], callback);
    }
    
}

module.exports = products;