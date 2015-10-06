// Starting a web server on port 8888
// The client is listening to two different sockets on this server, one of them has a custom handler

// "/Socket/socketDefault" is just an identifier for the socket, no module at this location
// "/Socket/socketCustom" is both an identifier for the socket and the path of the handler module /Socket/socketCustom.js, defining a function(socket) used on socket connection

var server = require('cre-nodejs-server');

server.events.on('serverStarted', function () {
  
  console.log('handling serverStarted event');
  
  setInterval(
    function () {
      server.socket('/Socket/socketDefault').emit('message', 'message sent every second on Default...');
    },
  1000);
  
  setInterval(
    function () {
      server.socket('/Socket/socketCustom').emit('message', 'message sent every 1.5 second on Custom...');
    },
  1500);
});

server.start({
  rootDirectory: require('path').resolve(__dirname)
});

