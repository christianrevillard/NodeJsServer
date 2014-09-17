var rfh = require("../FileHandlers/resourceFileHandler");

var handle = function(io, channel)
{
	var chat = io.of(channel)

	console.log('Setting up chat socket');

	chat.on('connection', function(socket){
		console.log('user connected');
		
		socket.broadcast.emit('chat message', 'hi !');
	  
		socket.on('disconnect', function(){
			socket.broadcast.emit('chat message', 'bye !');
			console.log('user disconnected');
		});
  
		socket.on('chat message', function(msg){
			console.log('message: ' + msg);
			chat.emit('chat message', msg);
		});
	}); 
 	
	return function(
			request,
			response)
	{
		
		rfh.handle(response, request, {'/files': './resources'}, "text/html")
	};
};
exports.handle = handle;
