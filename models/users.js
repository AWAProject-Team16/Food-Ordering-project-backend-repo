const db = require("../lib/database.js");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const users = {
  newUserRegister: function (info, callback) {
    bcrypt.hash(info.password, 10, function (err, hash) {
      return db.query(
        "insert into users (username, name, password, address, email, account_type, phonenumber) Values (?,?,?,?,?,?,?)",
        [
          info.username,
          info.name,
          hash,
          info.address,
          info.email,
          info.account_type,
          info.phonenumber,
        ],
        callback
      );
    });
  },

  getUserById(id, callback) {
    return db.query(
      "select idusers, username, name, address, email, account_type, phonenumber from users \
    where idusers=?",
      [id],
      callback
    );
  },

  getTotalRevenueOrdersCustomersForManager(userId, callback) {
    return db.query(
      "select sum(o.order_total_cost) as total_revenue, count(o.idorders) as total_orders, count(distinct o.users_idusers) as total_customers \
      from orders o inner join restaurants r on o.restaurants_idrestaurants=r.idrestaurants \
      inner join users u on r.users_idusers=u.idusers \
      where u.idusers=?",
      [userId],
      callback
    );
  },

  getMost4PopularDaysForManager(userId, callback) {
    return db.query(
      "select dayname(o.order_date) as day_name, count(*) as total_order \
      from orders o inner join restaurants r on o.restaurants_idrestaurants=r.idrestaurants \
      inner join users u on r.users_idusers=u.idusers \
      where u.idusers=? \
      group by day_name \
      order by total_order desc \
      limit 4",
      [userId],
      callback
    );
  },

  getMost6PopularTimeForManager(userId, callback) {
    return db.query(
      "select date_format(o.order_date, '%H') as hour, count(*) as total_order \
      from orders o inner join restaurants r on o.restaurants_idrestaurants=r.idrestaurants \
      inner join users u on r.users_idusers=u.idusers \
      where u.idusers=? \
      group by hour \
      order by total_order desc \
      limit 6",
      [userId],
      callback
    );
  },

  getMost3PopularProductsForManager(userId, callback) {
    return db.query(
      "select od.product_name as product_name, count(*) as total_order \
      from orders o inner join restaurants r on o.restaurants_idrestaurants=r.idrestaurants \
      inner join users u on r.users_idusers=u.idusers \
      inner join order_details od on o.idorders=od.orders_idorders \
      where u.idusers=? \
      group by od.product_name \
      order by total_order desc \
      limit 3",
      [userId],
      callback
    );
  },

  getTotalRestaurants(userId, callback) {
    return db.query(
      "select count(r.idrestaurants) as total_restaurants from users u inner join restaurants r on u.idusers=r.users_idusers \
      where u.idusers=?",
      [userId],
      callback
    );
  },
};

module.exports = users;
