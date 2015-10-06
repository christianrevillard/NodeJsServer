// Starting a web server on port 8887
// The client will listen to a socket on anothe server, running on port 8888

var server = require('cre-nodejs-server');

server.start({
  port:8887,
  rootDirectory: require('path').resolve(__dirname) 
});
