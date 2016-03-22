
var app = {

  server: '/classes/messages',
  username: 'anonymous',
  roomname: 'lobby',
  lastMessageId: 0,
  friends: {},

  init: function() {
    app.username = window.location.search.substr(10);
    $('#user').append(`<span>${app.username}</span>`);

    app.$main = $('#main');
    app.$message = $('#message');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    app.$send = $('#send');

    app.$chats.on('click', '.username', app.addFriend);
    app.$send.on('submit', app.handleSubmit);
    app.$roomSelect.on('change', app.saveRoom);

    app.startSpinner();
    app.fetch(true);

    setInterval(app.fetch, 3000);
  },

  send: function(data) {
    app.startSpinner();
    app.$message.val('');
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        app.fetch();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function(animate) {
    $.ajax({
      url: '/classes/rooms',
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        app.populateRooms(data);
      },
      error: function(data) {
        console.error('chatterbox: Failed to fetch rooms');
      }
    });
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        app.populateMessages(data);
        if (!data.results || !data.results.length) {
          app.stopSpinner();
          return;
        }
        var mostRecentMessage = data.results[data.results.length - 1];
        var displayedRoom = $('.chat span').first().data('roomname');
        app.stopSpinner();
        if (mostRecentMessage.objectId !== app.lastMessageId || app.roomname !== displayedRoom) {
          app.populateRooms(data.results);

          app.populateMessages(data.results);

          app.lastMessageId = mostRecentMessage.objectId;
        }
      },
      error: function(data) {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },

  clearMessages: function() {
    app.$chats.html('');
  },

  populateMessages: function(results) {
    app.clearMessages();
    app.stopSpinner();
    if (Array.isArray(results)) {
      results.forEach(app.addMessage);
    }
  },

  populateRooms: function(results) {
    app.$roomSelect.html('');
    app.$roomSelect.html('<option value="__newRoom">New room...</option><option value="lobby" selected>lobby</option></select>');

    if (results) {
      var rooms = {};
      results.forEach(function(data) {
        var roomname = data.roomname;
        if (roomname && !rooms[roomname]) {
          // Add the room to the select menu
          app.addRoom(roomname);

          // Store that we've added this room already
          rooms[roomname] = true;
        }
      });
    }

    // Select the menu option
    app.$roomSelect.val(app.roomname);
  },

  addRoom: function(roomname) {
    var $option = $('<option/>').val(roomname).text(roomname);
    app.$roomSelect.append($option);
  },

  addMessage: function(data) {

    if (!data.roomname) {
      data.roomname = 'lobby';
    }

    // Only add messages that are in our current room
    if (data.roomname === app.roomname) {
      var $chat = $('<div class="chat"/>');
      var $username = $('<span class="username"/>');
      $username.text(data.username + ': ').attr('data-username', data.username).attr('data-roomname', data.roomname).appendTo($chat);

      // Add the friend class
      if (app.friends[data.username] === true) {
        $username.addClass('friend');
      }

      var $message = $('<br><span/>');
      $message.text(data.text).appendTo($chat);

      app.$chats.append($chat);
      window.scrollTo(0, document.body.scrollHeight);
    }
  },

  addFriend: function(evt) {
    var username = $(evt.currentTarget).attr('data-username');

    if (username !== undefined) {
      app.friends[username] = true;

      var selector = '[data-username="' + username.replace(/"/g, '\\\"') + '"]';
      var $usernames = $(selector).addClass('friend');
    }
    app.postFriendList();
  },

  saveRoom: function(evt) {

    var selectIndex = app.$roomSelect.prop('selectedIndex');
    if (selectIndex === 0) {
      var roomname = prompt('Enter room name');
      if (roomname) {
        $.ajax({
          url: '/classes/rooms',
          type: 'POST',
          data: JSON.stringify({roomname: roomname}),
          contentType: 'application/json',
          success: function (data) {
          },
          error: function (data) {
            console.error('chatterbox: Failed to send message');
          }
        });
        app.roomname = roomname;
        app.addRoom(roomname);
        app.$roomSelect.val(roomname);
        app.fetch();
      }
    } else {
      app.startSpinner();
      app.roomname = app.$roomSelect.val();
      app.fetch();
    }
  },

  handleSubmit: function(evt) {
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby'
    };
    console.log(message)
    app.send(message);
    evt.preventDefault();
  },

  postFriendList () {
    // $('#friendBox').show();
    var $list = $('#friendList');
    $list.html('');
    for (var key in app.friends) {
      $list.append(`<li class='friendOnList'>${key}</li>`);
    }
  },

  startSpinner: function() {
    $('.spinner img').show();
    $('form input[type=submit]').attr('disabled', 'true');
  },

  stopSpinner: function() {
    $('.spinner img').fadeOut('fast');
    $('form input[type=submit]').attr('disabled', null);
  }
};

