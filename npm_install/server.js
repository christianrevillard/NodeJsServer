var express = require("express");
var url = require("url");
var defaultRoutes = require('./creServer/defaultRoutes');
var sockets = require('./creServer/sockets');
var events = new (require('events').EventEmitter)();
var defaultTempFolder = '/tmp';

var start = function (parameters) {
  
  exports.applicationRoot = parameters.rootDirectory;
  exports.pageHeader = parameters.pageHeader;
  exports.tempFolder = (parameters ? parameters.tempFolder : []) || defaultTempFolder;
  exports.contentTypes = parameters.contentTypes;
  
  var port = (parameters  ? parameters.port : null) || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8888;
  var ip = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"; //127.0.0.1
  console.log("Listening to " + ip + ":" + port);
    
  var app = express();
  var server = app.listen(port, ip);
  exports.io = require('socket.io').listen(server);
	
  var routes =  parameters ? parameters.routes || [] : [];

  routes = defaultRoutes.addDefaultRoutes(routes);

  routes.forEach(
    function (route, index) {
      console.log('Registering route', route.route);
      app.all(route.route, route.handler);
    });
  
  if (parameters.sockets) {
    parameters.sockets.forEach(function (socket) { sockets.socket(socket); });
  }

  console.log("Server has started.");
  
  events.emit('serverStarted');
}

var socket = function (socketName) {
  return sockets.socket(socketName);
}

exports.start = start;
exports.socket = socket;
exports.clientFileHandler = require('./creServer/clientFileHandler');
exports.events = events;
