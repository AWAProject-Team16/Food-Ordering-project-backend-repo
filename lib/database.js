// 111
const mysql = require('mysql');

let pool = null;
try {
  pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tank-r34S',
    database: 'mydb'
  });

} catch (error) {
  console.error('Mysql pool create failed');
  console.error(error);
}


const connection = {
  query: (query, ...parameters) =>
  {
    let promise = new Promise(function(resolve, reject) {
      pool.query(query, ...parameters, (error, results, fields) => {
        if(error) {
          reject(error)
        };

        resolve(results);
      })
    });

    return promise;
  },
  closeAll: () => {
    pool.end();
  }
};

module.exports = connection;