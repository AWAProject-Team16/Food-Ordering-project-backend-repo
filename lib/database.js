// 111
const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tank-r34S',
    database: 'mydb'
})



module.exports = connection;