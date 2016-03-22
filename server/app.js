var express = require('express');
var db = require('./db');
var mysql = require('mysql');

var morgan = require('morgan');
var parser = require('body-parser');

var router = require('./routes.js');
	
var app = express();

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b8f6e89816f2c4',
  password: '554e96fd',
  database: 'heroku_08d0096ff5bdb97'
});

connection.connect();

var port = process.env.PORT || 3000;

app.set('port', port);

app.use(morgan('dev'));
app.use(parser.json());

app.use('/classes', router);

app.use(express.static(__dirname + '/../client'));

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
app.listen(port);

module.exports = app;
