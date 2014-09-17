var connect = function(io) {

	var chat = io;//io.of('/chat')

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
 
	return chat;
};

exports.connect = connect;