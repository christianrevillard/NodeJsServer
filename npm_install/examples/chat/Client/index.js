var socket = io("/Socket/chat");

var submitMessage = function () {
  socket.emit('message', document.getElementById('message').value);
  document.getElementById('message').value = '';
  return false;
};

socket.on('message', function (msg) {
  document.getElementById('messages').value += msg + '\r\n' ;
});