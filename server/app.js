var express = require('express');
var db = require('./db');
var mysql = require('mysql');

var morgan = require('morgan');
var parser = require('body-parser');

var router = require('./routes.js');
	
var app = express();
module.exports.app = app;

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b8f6e89816f2c4',
  password: '554e96fd',
  database: 'heroku_08d0096ff5bdb97'
});

var port = process.ENV.port || 3000;

app.set('port', port);

app.use(morgan('dev'));
app.use(parser.json());

app.use('/classes', router);

app.use(express.static(__dirname + '/../client'));

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

