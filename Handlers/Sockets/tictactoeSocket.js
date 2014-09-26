var isConnected = false;
var creanvasSocket = require('./CreanvasSocket');

var connect = function(io) {

	var tictactoe = io.of('/tictactoe')

	console.log('Setting up tictactoe socket');

	tictactoe.on('connection', function(socket){
		console.log('user connected: ' + socket.id);
		
		creanvasSocket.addCreanvas(io, tictactoe, socket);
		
		socket.on('disconnect', function(){
			socket.broadcast.emit('played', 'I am out !');
			console.log('user disconnected');
		});
  
		socket.on('played', function(msg){
			console.log('message: ' + msg + ' from socket.id ' + socket.id );
			socket.emit('played', 'you have played: ' + msg);
			socket.broadcast.emit('played', 'Someone has played : ' + msg);						
		});
		
		// initial set up
		// choose check player 1, 2 and create a room...		
		socket.on('startGame', function()
		{
			console.log('starting a game' );
			socket.emit('addElement', JSON.stringify({
				"name": 'X1',
				"left" : -75,
				"top": 75,
				"width": 150,
				"height": 150,
				"elementType": 'X',
				"x": 200,
				"y": 200,
				"z": 0
			}));
		});
	});

	return tictactoe;
};

exports.connect = connect;
exports.isConnected = isConnected;