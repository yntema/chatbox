var enteredUser;
if (!/(&|\?)username=/.test(window.location.search)) {
  var newSearch = window.location.search;
  if (newSearch !== '' & newSearch !== '?') {
    newSearch += '&';
  }
  enteredUser = prompt('What is your name?');
  newSearch += 'username=' + (enteredUser || 'anonymous');
  window.location.search = newSearch;
}

$.ajax({
  url: '/classes/users',
  type: 'POST',
  data: JSON.stringify({username: enteredUser}),
  contentType: 'application/json',
  success: function (data) {
  },
  error: function (data) {
    console.error('chatterbox: Failed to send user', data);
  }
});
