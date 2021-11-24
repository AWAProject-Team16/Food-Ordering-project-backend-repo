const db = require('../lib/database.js');

const orders = {

    getOrderById: function(id, userId, callback) {
        return db.query("select * from orders where idorders=? AND users_idusers=?", [id, userId.userId], callback);
    },

    getOrdersByCustomer: function(userId, callback) {
        return db.query("select * from orders where users_idusers=?", [userId.userId], callback);
    },

    getOrdersByManager: function(userId, callback) {
        return db.query("select * from orders where users_idusers=?", [userId.userId], callback);
    },

    getOrdersByRestaurant: function(restaurantId, userId, callback) {
        return db.query("select * from orders where restaurants_idrestaurants=? AND users_idusers=?", [restaurantId, userId.userId], callback);
    },

    addOrder: function(info, callback) {
        return db.query("insert into orders(restaurants_idrestaurants, users_idusers, order_date, order_delivery_location, order_status, \
        order_status_extra_info, order_total_cost) values (?,?,?,?,?,?,?)", [info.restaurantId, info.userId, info.order_date, info.location, info.status, 
        info.status_extra, info.cost], callback);
    },
    
    addDetailedOrder: function(info, callback) {
        return db.query("insert into order_products(products_idproducts, orders_idorders) values (?,?)", [info.productId, info.orderid], callback);
    },
}

module.exports = orders;