// 111
const mysql = require('mysql');

try {
      const connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '1216',
      database: 'mydb'
    });
} catch(error) {
    console.error("Mysql connection failed");
    console.error(error);
}


module.exports = connection;