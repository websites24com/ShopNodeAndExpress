const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user:  'root',
    database: 'Node_shop',
    password: '',
});

module.exports = pool.promise()