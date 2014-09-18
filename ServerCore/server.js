var express = require("express");
var url = require("url");

var start = function(handlers) {

	var server = express();

	var http = require('http').Server(server);
	var	io = require('socket.io').listen(http)

		http.listen(
				process.env.OPENSHIFT_NODEJS_PORT || 8888, 
				process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

		for(var i=0; i<handlers.length; i++)
		{
			console.log(handlers[i][0]);		
			if (handlers[i][1].setSocket)
			{
				handlers[i][1].setSocket(io);
			}

			server.get(handlers[i][0], handlers[i][1].handle);
		}
		
		// fallback 
		server.get('/*', require('./fileNotFound').handle);

		console.log("Server has started.");
}

exports.start = start;
