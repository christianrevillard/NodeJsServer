var server = require('cre-nodejs-server');

server.start({
  port:80,
  rootDirectory: require('path').resolve(__dirname),
  sockets:['/Socket/chat']
});
