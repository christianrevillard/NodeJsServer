var getHandle = function(globals)
{
	return function(request, response)
	{			
		var url = require('url');
		var fileName = url.parse(request.url).pathname;
	
		var socketName = fileName.replace('/socket/','');
	
		var socket = require('../../ApplicationHandlers/' + socketName);
		
		if (socket.applicationSocket)
		{
			console.log('Websocket application ' + socketName + ' is already started');
		}
		else
		{
			console.log('Start Websocket application ' + socketName);
			socket.startApplication(globals.io.of('/' + socketName));
		}
		
		// just so the browser is happy !
		//response.writeHead(200, {"Content-Type": "text/plain"});
		response.end();				
	};
};

exports.getHandle= getHandle;
