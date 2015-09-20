//var server = require('cre-nodejs-server');
var server = require('../../server.js');

server.start({
  port:8887,
  rootDirectory: require('path').resolve(__dirname)
});
