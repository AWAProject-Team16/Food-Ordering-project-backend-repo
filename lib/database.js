require("dotenv").config();
const mysql = require("mysql2");

let pool = null;
try {
  pool = mysql.createPool({
    host: process.env.HOST,
    user: "root", // aws issue
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
} catch (error) {
  console.error("Mysql pool create failed");
  console.error(error);
}

const connection = {
  query: (query, ...parameters) => {
    let promise = new Promise(function (resolve, reject) {
      pool.query(query, ...parameters, (error, results, fields) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });

    return promise;
  },
  closeAll: () => {
    pool.end();
  },
};

module.exports = connection;
