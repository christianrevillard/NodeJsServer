var getHandler = function (root) {
	return {
		handle: function (request, response, next) {
			var url = require('url');
			var fileName = url.parse(request.url).pathname;
			
			console.log('Connect socket - fileName : ' + fileName);
			
			var socketName = fileName.replace('/socket/', '');
			
			console.log('Connect socket - socketName : ' + socketName);
			console.log('Dirname in connectsocket.js: ' + __dirname);
			
			//applicationHandlers/'
			var socket = require(root + '/' + socketName);
			
			if (socket.applicationSocket) {
				console.log('Websocket application ' + socketName + ' is already started');
			}
			else {
				console.log('Start Websocket application ' + socketName);
				socket.startApplication(global.io.of('/' + socketName));
			}
			
			response.end();							
		}
	};
};

exports.getHandler= getHandler;
