var isConnected = false;
var creanvasSocket = require('./CreanvasSocket');

var connect = function(io) {

	var tictactoe = io.of('/tictactoe')

	console.log('Setting up tictactoe socket');

	tictactoe.on('connection', function(socket){
		console.log('user connected: ' + socket.id);
		
		creanvasSocket.addCreanvas(socket);
		
		socket.on('disconnect', function(){
			socket.broadcast.emit('played', 'I am out !');
			console.log('user disconnected');
		});
  
		socket.on('played', function(msg){
			console.log('message: ' + msg + ' from socket.id ' + socket.id );
			socket.emit('played', 'you have played: ' + msg);
			socket.broadcast.emit('played', 'Someone has played : ' + msg);
						
		});
	}); 
 
	return tictactoe;
};

exports.connect = connect;
exports.isConnected = isConnected;