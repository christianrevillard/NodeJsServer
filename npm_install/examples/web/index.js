//var server = require('cre-nodejs-server');
var server = require('../../server.js');

server.start({
  rootDirectory: require('path').resolve(__dirname),
  routes: [
    { route: '/sum', handler: server.clientFileHandler('./Client/sum.html') },
    { route: '/calculate', handler: require('./calculate') },
  ]
});