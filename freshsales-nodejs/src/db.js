const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '11111111',
    database: 'freshsales'
});

const promisePool = pool.promise();

module.exports = promisePool;
