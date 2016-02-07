// YOU DO NOT NEED TO EDIT this code.
//
// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.
var enteredUser;
if (!/(&|\?)username=/.test(window.location.search)) {
  var newSearch = window.location.search;
  if (newSearch !== '' & newSearch !== '?') {
    newSearch += '&';
  }
  enteredUser = prompt('What is your name?');
console.log('enteredUser',enteredUser);
  newSearch += 'username=' + (enteredUser || 'anonymous');
  window.location.search = newSearch;
};

$.ajax({
  url: 'http://127.0.0.1:3000/classes/users',
  type: 'POST',
  data: JSON.stringify({username: enteredUser}),
  contentType: 'application/json',
  success: function (data) {
    console.log('enteredUser data', data);
  },
  error: function (data) {
    console.error('chatterbox: Failed to send user', data);
  }
});

// // Put your parse application keys here!
// $.ajaxPrefilter(function (settings, _, jqXHR) {
//   jqXHR.setRequestHeader("X-Parse-Application-Id", "PARSE_APP_ID");
//   jqXHR.setRequestHeader("X-Parse-REST-API-Key", "PARSE_API_KEY");
// });
