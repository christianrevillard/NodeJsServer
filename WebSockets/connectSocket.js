var io_;

var handle = function(request, response)
{			
	var url = require('url');
	var fileName = url.parse(request.url).pathname;

	var pathLocation = fileName.replace('/socket/','');

	var socket = require('./' + pathLocation + 'Socket');
	
	socket.connect(io_);
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end();				
};

var setSocket = function(io)
{
	io_ = io;
};

exports.handle= handle;
exports.setSocket = setSocket;