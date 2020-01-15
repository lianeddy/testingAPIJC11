const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'lianeddy',
    password: 'asd123',
    database: 'db_example',
    port: 3306,
    multipleStatements: true
});

module.exports = db;