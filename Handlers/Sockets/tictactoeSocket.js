var isConnected = false;
var serverController = require('../../CreanvasModule/ServerController');

var connect = function(io) {

	var tictactoe = io.of('/tictactoe')

	console.log('Setting up tictactoe socket');

	tictactoe.on('connection', function(socket){
		console.log('user connected: ' + socket.id);
		
		var controller = new serverController.Controller(tictactoe, socket);
		
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
		socket.on('startApplication', function()
		{
			console.log('starting a game' );

			var blockedX = false;
			
			controller.addElement
			(
				["name", "X1"],
				["image", { "width":150,"height":150, "drawingMethod": 'X'}],
				["position", {"x": 600, "y": 150, "angle": Math.PI / 4}],			
				["duplicable", {"generatorCount":3, "isBlocked":function(){return blockedX;}}],
				["droppable", {}],
				["customTimer",{"time": 80, "action": function() { this.angle+= Math.PI / 32;}}]
			);

			controller.addElement
			(
				["name", "X2"],
				["image", { "width":150,"height":150, "drawingMethod": 'X'}],
				["position", {"x": 300, "y": 150, "angle": Math.PI / 4}],			
				["movable", {}]
			);

/*			
			controller.addElement({
				"name": 'X1',
				"left" : -75,
				"top": 75,
				"width": 150,
				"height": 150,
				"elementType": 'X',
				"x": 200,
				"y": 200,
				"z": 0
			}, socket);*/
		});
	});

	return tictactoe;
};

exports.connect = connect;
exports.isConnected = isConnected;