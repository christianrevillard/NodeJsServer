//var server = require('cre-nodejs-server');
var server = require('../../server.js');

server.start({
  rootDirectory: require('path').resolve(__dirname),
  onStarted: function () {  
    console.log('Server is started');
  }
});

setInterval(
  function () {
    server.socket('/Socket/socketDefault').emit('message', 'message sent every second...');
  },
  1000);

setInterval(
  function () {
    server.socket('/Socket/socketCustom').emit('message', 'message sent every 1.5 second...');
  },
  1500);
