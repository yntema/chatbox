var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
    	db.query('select messages.text, users.name from messages left outer join users on (messages.userId = users.id)', function(err, results) {
    		console.log('results of get from db', err, results);
    		callback(err, results);
    	});
    }, 
    post: function (params, callback) {
      // var dbArray = [params.body.username,params.body.text,params.body.roomname];
      console.log('model post array........', params);
  		db.query('insert into rooms (name) values (?)', params[2]);
    	db.query('insert into messages (text, userId) values (?, (select id from users where name = ? limit 1))', [params[1],params[0]], function(err, results) {
    		console.log('results of posting message to db', err, results);
    		callback(err, results);
    	});

    } 
  },

  users: {
    get: function (callback) {
    	db.query('select name from users', function(err, result) {
    		callback(err, results);
    	})
    },
    post: function (params, callback) {
    	db.query('insert into users (name) value (?)', params, function(err, results) {
    		callback(err, results);
    	})
    }
  }
};

