var express = require('express');
var db = require('./db/index');
var mysql = require('mysql');

var morgan = require('morgan');
var parser = require('body-parser');

var router = require('./routes.js');
	
var app = express();

var port = process.env.PORT || 3000;

// app.set('port', port);

app.use(morgan('dev'));
app.use(parser.json());

app.use('/classes', router);

app.use(express.static(__dirname + '/../client'));

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
app.listen(port);

module.exports = app;
