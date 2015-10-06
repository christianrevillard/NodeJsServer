var server = require('cre-nodejs-server');

server.start({
  rootDirectory: require('path').resolve(__dirname),
  routes: [
    { route: '/', handler: server.clientFileHandler('/Client/uploadImage.html') },
    { route: '/start', handler: server.clientFileHandler('/Client/uploadImage.html') },
    { route: '/upload', handler: require('./uploadHandler') }
  ]
});
