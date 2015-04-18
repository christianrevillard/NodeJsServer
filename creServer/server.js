var express = require("express");
var url = require("url");

var start = function(root, handlers) {
  
  global.appRoot = root;

	var server = express();
	
	var http = require('http').createServer(server);
	global.io = require('socket.io')(http);

	console.log("Listening to port " + (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8888));
	
	http.listen(
        process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8888, 
		process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"); //127.0.0.1
  
		
	for(var i=0; i<handlers.length; i++)
	{
		console.log(handlers[i][0]);		

		if (handlers[i][1].handle)
		{
			server.all(handlers[i][0], handlers[i][1].handle);
		}
		else if (handlers[i][1].getHandle)
		{
			server.all(handlers[i][0], handlers[i][1].getHandle());
		}
	}
	
	console.log("Server has started.");
}

exports.start = start;
