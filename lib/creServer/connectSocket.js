var handle = function (request, response, next) {
  var url = require('url');
  var fileName = url.parse(request.url).pathname;
  
  console.log('Connect socket - fileName : ' + fileName);
  
  var socketName = fileName.replace('/socket/', '');
  
  console.log('Connect socket - socketName : ' + socketName);
  
  //applicationHandlers/'
  var socket = require(global.appRoot + '/' + socketName);
  
  if (socket.applicationSocket) {
    console.log('Websocket application ' + socketName + ' is already started');
  }
  else {
    console.log('Start Websocket application ' + socketName);
    socket.startApplication(global.io.of('/' + socketName));
  }
  
  response.end();
};

exports.handle = handle;
