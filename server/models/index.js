var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select messages.text, users.username, rooms.roomname from messages left outer join users on messages.userId = users.id left outer join rooms on messages.roomId = rooms.id', function(err, results) {
        callback(err, results);
      });
    }, 
    post: function (params, callback) {
      var queryStr = 'insert into messages(text, userId, roomId) \
                            value (?, (select id from users where username = ? limit 1), (select id from rooms where roomname = ? limit 1))';
      var paramsArray = [params[1], params[0], params[2]];
      db.query(queryStr, paramsArray, function(err, results) {
        callback(err, results);
      });
    } 
  },

  users: {
    get: function (callback) {
      db.query('select username from users', function(err, result) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      db.query('insert into users (username) value (?)', params, function(err, results) {
        callback(err, results);
      });
    }
  },

  rooms: {
    get: function (callback) {
      db.query('select roomname from rooms', function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      db.query('insert into rooms (roomname) value (?)', params, function(err, results) {
        callback(err, results);
      });
    }
  }
};

