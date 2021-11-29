const db = require('../lib/database.js');

// !!! Not done yet !!!
const orders = {

    // ORDERS -> FOREIGN KEYS -> FOREIGN KEY OPTIONS -> NO ACTIONS ON UPDATE AND ON DELETE FOR restaurant table

    getUserOrders: function(userId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders where users_idusers = ?", [userId], callback);
    },


    getOrderDetails: function(userId, orderId, callback) {
        return db.query("select orders_idorders, product_name, product_cost from order_details JOIN orders ON order_details.orders_idorders = orders.idorders \
        where orders.users_idusers = ? AND orders_idorders = ?", [userId, orderId], callback);
    },


    getRestaurantOrders: function(userId, restaurantId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders \
        JOIN restaurants ON orders.restaurants_idrestaurants = restaurants.idrestaurants where orders.users_idusers = ? \
        OR restaurants.users_idusers = ? AND restaurants_idrestaurants = ?", [userId, userId, restaurantId], callback);
    },


    
    // Need transaction for adding rows in multiple table (Orders and order_details) + product multiple-unknown-count adding. 
    // For(int i = 0; i<productCount; i++) {db.query("insert into order_details (orders_idorders, product_name, product_cost) values (?,?,?)", [orderId, body.name, body.cost])}

    // addOrder: function(userId, info, callback) {
    //     for(var i = 0; i < info.count; i++) {
    //         db.query("insert into order_details");
    //     }
    //     return db.query("BEGIN");
    // }
}

module.exports = orders;
