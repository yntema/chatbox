var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
    	models.messages.get(function(err, results) {
    		res.send(results);
    	});
    }, 
    post: function (req, res) {
    	var params = [req.body.username, req.body.text, req.body.roomname];
    	models.messages.post(params, function(err, results) {
		  	res.sendStatus(201);
    	});
    } 
  },

  users: {
    get: function (req, res) {
    	models.users.get(function(err, results) {
	    	res.send(200);
    	});
    },
    post: function (req, res) {
    	var params = req.body.username;
    	console.log('params.............for user', params);
    	models.users.post(params, function(err, results) {
	    	res.sendStatus(201);
    	});
    }
  }
};

