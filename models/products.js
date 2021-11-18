const db = require('../lib/database.js');

const products = {

    getProductById: function(id, callback) {
        return db.query('select * from products where idproducts = ?', [id.productId], callback);
    },

    getProductByCategory: function(id, callback) {
        return db.query('select * from products where categories_idcategories = ?', [id.categoryId], callback);
    }
    
}

module.exports = products;