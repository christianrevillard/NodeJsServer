// socket is not running on the same server, we need to specify server and port
var socket = io("ws://localhost:8888/Socket/socketDefault");

socket.on('message', function (message) {
  document.getElementById('log').value += 'socketDefault: ' + message + '\r\n';
});

// socket is not running on the same server, we need to specify server and port
var socket2 = io("ws://localhost:8888/Socket/socketCustom");

socket2.on('message', function (message) {
  document.getElementById('log').value += 'socketCustom: ' + message + '\r\n';
});
