// 111
const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1216',
    database: 'mydb'
})



module.exports = connection;