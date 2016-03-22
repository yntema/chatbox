var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var dbConnection = mysql.createConnection ({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b8f6e89816f2c4',
  password: '554e96fd',
  database: 'heroku_08d0096ff5bdb97'
});

dbConnection.connect();

module.exports = dbConnection;
