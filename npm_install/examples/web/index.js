var server = require('cre-nodejs-server');

server.start({
  rootDirectory: require('path').resolve(__dirname),
  routes: [
    { route: '/sum', handler: server.clientFileHandler('./Client/sum.html') },
    { route: '/calculate', handler: require('./calculate') },
  ],
  contentTypes: [
    { extension: ".html", contentType: 'text/html' },
    { extension: ".js", contentType: 'text/javascript' }
  ]
});