const db = require('../lib/database.js');

const orders = {

    // ORDERS -> FOREIGN KEYS -> FOREIGN KEY OPTIONS -> NO ACTIONS ON UPDATE AND ON DELETE FOR restaurant table

    getUserOrders: function(userId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders where users_idusers = ?", [userId], callback);
    },


    getUserOrderDetails: function(userId, orderId, callback) {
        return db.query("select orders_idorders, product_name, product_cost from order_details JOIN orders ON order_details.orders_idorders = orders.idorders \
        where orders.users_idusers = ? AND orders_idorders = ?", [userId, orderId], callback);
    },


    getRestaurantOrders: function(userId, restaurantId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders \
        JOIN restaurants ON orders.restaurants_idrestaurants = restaurants.idrestaurants where orders.users_idusers = ? \
        OR restaurants.users_idusers = ? AND restaurants_idrestaurants = ?", [userId, userId, restaurantId], callback);
    },


    getOrderById: function(id, userId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders where idorders=? AND users_idusers=?", [id, userId.userId], callback);
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