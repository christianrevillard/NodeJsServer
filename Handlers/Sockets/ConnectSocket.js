var getHandle = function(globals)
{
	return function(request, response)
	{			
		var url = require('url');
		var fileName = url.parse(request.url).pathname;
	
		var pathLocation = fileName.replace('/socket/','');
	
		var socket = require('./' + pathLocation + 'Socket');
		
		if (socket.isConnected)
		{
			console.log('Socket already set up');
		}
		else
		{
			socket.connect(globals.io);
			socket.isConnected = true;
		}
		
		// just so the browser is happy !
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end();				
	};
};

exports.getHandle= getHandle;
