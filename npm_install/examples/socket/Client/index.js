// socket is running on the same server, we only need to specify the socket's local name
var socket = io("/Socket/socketDefault");

socket.on('message', function (message) {
  document.getElementById('log').value += 'socketDefault: ' + message + '\r\n';
});

var socket2 = io("/Socket/socketCustom");

socket2.on('message', function (message) {
  document.getElementById('log').value += 'socketCustom: ' + message + '\r\n';
});
