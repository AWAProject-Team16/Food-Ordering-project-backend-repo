const db = require('../lib/database.js');

// !!! Not done yet !!!
const orders = {

    getUserOrders: function(userId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders where users_idusers = ?", [userId], callback);
    },



    getOrderDetails: function(userId, orderId, callback) {
        return db.query("select product_name, product_cost, product_amount from order_details JOIN orders ON order_details.orders_idorders = orders.idorders \
        where orders.users_idusers = ? AND orders_idorders = ?", [userId, orderId], callback);
    },

    

    getRestaurantOrders: function(userId, restaurantId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders \
        JOIN restaurants ON orders.restaurants_idrestaurants = restaurants.idrestaurants where orders.users_idusers = ? \
        OR restaurants.users_idusers = ? AND restaurants_idrestaurants = ?", [userId, userId, restaurantId], callback);
    },






    addOrder: function(userId, info, callback) { 
        return db.query("insert into orders (restaurants_idrestaurants, users_idusers, order_date, order_delivery_location, \
        order_status, order_total_cost) values (?,?,?,?,?,?)", [info.restaurants_idrestaurants, userId, info.order_date, info.order_delivery_location, info.order_status, info.order_total_cost], callback);
    },

    addOrderDetails: function(orderId, ShoppingCart, callback) {
        return db.query("insert into order_details (orders_idorders, product_name, product_cost, product_amount) values ?", [ShoppingCart.map(item => [orderId, item.value, item.cost,
            item.qty])], callback);
    }
}

module.exports = orders;
