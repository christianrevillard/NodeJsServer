//var server = require('cre-nodejs-server');
var server = require('../../server.js');

server.start({
  rootDirectory: require('path').resolve(__dirname)
});

server.socket('/Socket/chat');