const db = require('../lib/database.js');

// !!! Not done yet !!!
const orders = {

    getUserOrders: function(userId, callback) {
        return db.query("select idorders, order_status, order_total_cost, order_date from orders where users_idusers = ?", [userId], callback);
    },



    // Get orders for current user. Added by Thuc
    getMyOrdersPlusNames: function(userObj, callback) {
        if(userObj.account_type == 1){  // customer
            return db.query("select orders.*, restaurants.name as restaurant_name, users.name as customer_name \
            from orders inner join restaurants \
            on orders.restaurants_idrestaurants = restaurants.idrestaurants \
            inner join users on users.idusers = orders.users_idusers \
            where orders.users_idusers = ? \
            order by orders.idorders desc",
            [userObj.idusers],
            callback);
        }
        else {  // manager
            return db.query("select orders.*, restaurants.name as restaurant_name, users.name as customer_name \
            from orders inner join restaurants \
            on orders.restaurants_idrestaurants = restaurants.idrestaurants \
            inner join users on users.idusers = orders.users_idusers \
            inner join users users2 on users2.idusers = restaurants.users_idusers \
            where users2.idusers = ? \
            order by orders.idorders desc",
            [userObj.idusers],
            callback);
        }
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
        order_status, order_total_cost) values (?,?,now(),?,?,?)", 
        [info.restaurants_idrestaurants, userId, info.order_delivery_location, "Received", info.order_total_cost], callback);
    },

    addOrderDetails: function(orderId, ShoppingCart, callback) {
        return db.query("insert into order_details (orders_idorders, product_name, product_cost, product_amount) values ?", [ShoppingCart.map(item => [orderId, item.value, item.cost,
            item.qty])], callback);
    },


    checkOrderStatus: function(userId, info, callback) {
        return db.query("Select order_status from orders join restaurants on orders.restaurants_idrestaurants = restaurants.idrestaurants where idorders = ? \
        AND restaurants.users_idusers = ?", [info.idorders, userId], callback);
    },

    updateOrder: function(userId, info, callback) {
            return db.query("Update orders Join restaurants on orders.restaurants_idrestaurants = restaurants.idrestaurants set order_status = ? \
            where orders.idorders = ? AND restaurants.users_idusers = ?", [info.order_status, info.idorders, userId], callback);
    },

    // Added by Thuc
    updateOrderStatusAndETC: function(userId, info, callback) {
        return db.query("Update orders Join restaurants on orders.restaurants_idrestaurants = restaurants.idrestaurants \
        set order_status = ?, order_status_extra_info = ? \
        where orders.idorders = ? AND restaurants.users_idusers = ?",
        [info.order_status, info.order_status_extra_info, info.idorders, userId],
        callback);
}
}

module.exports = orders;
