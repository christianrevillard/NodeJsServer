var express = require("express");
var url = require("url");
var defaultRoutes = require('./creServer/defaultRoutes');
var sockets = require('./creServer/sockets');

var start = function (parameters) {
  
  exports.applicationRoot = parameters ? parameters.rootDirectory : null;
  exports.pageHeader = parameters ? parameters.pageHeader : null;
  
  var server = express();
  
  var http = require('http').createServer(server);
  exports.io = require('socket.io')(http);
  
  var port = (parameters  ? parameters.port : null )  || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8888;
  var ip = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"; //127.0.0.1

	console.log("Listening to " + ip + ":" + port);
	
	http.listen(port, ip); 
  
  var routes =  parameters ? parameters.routes || [] : [];

  routes = defaultRoutes.addDefaultRoutes(routes);

  routes.forEach(
    function (route, index) {
      console.log('Registering route', route.route);
      server.all(route.route, route.handler);
    });
  
  console.log("Server has started.");
  
  if (parameters.onStarted) {
    parameters.onStarted();
  }
}

var socket = function (socketName) {
  return sockets.socket(socketName);
}

exports.start = start;
exports.socket = socket;
exports.clientFileHandler = require('./creServer/clientFileHandler');
