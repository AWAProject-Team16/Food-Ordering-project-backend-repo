const db = require('../lib/database.js');

const products = {

    getProductById: function(id, callback) {
        return db.query('select * from products where idproducts = ?', [id.productId], callback);
    },

    getProductByCategory: function(id, callback) {
        return db.query('select * from products where categories_idcategories = ?', [id.categoryId], callback);
    },

    addProduct: function(info, callback) {
        return db.query('insert into products (categories_idcategories, product_name, product_description, product_cost, product_image values (?,?,?,?,?))',
        [info.categoryId, info.name, info.description, info.cost, info.image], callback);
    },

    deleteProduct: function(info, callback) {
        return db.query('delete from products where idproducts = ?', [info.productsId], callback);
    }
    
}

module.exports = products;