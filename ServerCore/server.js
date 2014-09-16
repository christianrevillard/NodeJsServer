var http = require("http");
var url = require("url");

var start = 
	function(
		route,
		fileLocations,
		handlers) 
	{
		
		var onRequest = 
			function(
				request, 
				response) 
			{
				var pathname = url.parse(request.url).pathname;
				console.log("Request for " + pathname + " received.");
				route(
					fileLocations,
					handlers, 
					pathname, 
					response, 
					request);
			};
		
		var server = 
			http
				.createServer(onRequest);
		
		server.listen(
				process.env.OPENSHIFT_NODEJS_PORT || 8888, 
				process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
		
		console.log("Server has started.");
		
		return server;
	}

exports.start = start;