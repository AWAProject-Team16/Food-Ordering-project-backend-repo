// 111
const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'http://localhost:3000',
  user: 'root',
  password: '1216',
  database: 'mydb'
});
module.exports = connection;