var isConnected = false;
var serverController = require('../../CreanvasModule/ServerController');
var games = [];

// called only for the first of all users
var connect = function(io) {

	var tictactoe = io.of('/tictactoe')

	console.log('Setting up tictactoe socket ');
	
	// called for each user
	tictactoe.on('connection', function(socket){
		console.log('user connected: ' + socket.id);
				
		socket.on('disconnect', function(){
			socket.broadcast.emit('played', 'I am out !');
			console.log('user disconnected');
		});
  
		/*
		socket.on('played', function(msg){
			console.log('message: ' + msg + ' from socket.id ' + socket.id );
			socket.emit('played', 'you have played: ' + msg);
			socket.broadcast.emit('played', 'Someone has played : ' + msg);						
		});*/
				
		// initial set up for single socket
		// choose check player 1, 2 and create a room...		
		// here: check if other player here - create a room per game...
		socket.on('joinGame', function()
		{
			var controller;
			var playerX;
			var playerO;
			
			if (games.length == 0 || games[games.length-1].playerO)
			{			
				console.log('starting a game' );
				socket.join('game' + games.length)
				controller = new serverController.Controller(tictactoe, socket)
				playerX = socket.id;
				games.push({playerX:playerX,controller:controller});
			}
			else
			{			
				console.log('joining a game' );
				socket.join('game' + (games.length - 1))
				controller = games[games.length-1].controller;
				playerX = games[games.length-1].playerX;
				playerO = games[games.length-1].playerO = socket.id;
			}

			// event coming from both, should identify player...
			console.log('adding socket ' + socket.id);
			controller.addSocket(socket);
				
			var blockedX = false;
			var blockedO = true;
			
			controller.addElement
			(
				["name", "Xsource"],
				["image", { "width":150,"height":150, "drawingMethod": 'X'}],
				["position", {"x": 600, "y": 150, "angle": Math.PI / 4}],			
				["duplicable", {"generatorCount":3, "isBlocked":function(element, originSocketId){return blockedX || originSocketId != playerX;}}],
				["droppable", {ondrop: function(dropzone, dropped){ blockedX = true; blockedO=false;}}],
				["customTimer",{"time": 80, "action": function() { this.angle+= Math.PI / 32;}}]
			);

			controller.addElement
			(
				["name", "Osource"],
				["image", { "width":150,"height":150, "drawingMethod": 'O'}],
				["position", {"x": 600, "y": 325, "scaleX": 0.8, "scaleY": 1.2}],			
				["duplicable", {"generatorCount":3, "isBlocked":function(element, originSocketId){return blockedO || originSocketId != playerO;}}],
				["droppable", {ondrop: function(dropzone, dropped){ blockedO = true; blockedX=false;}}]
			);

			var tttCase = function(x,y)
			{
				var theCase = controller.addElement(
					["name", 'case(' + x + ',' + y + ')'],
					["image", { "top":0, "left":0, "width":150, "height":150, "drawingMethod":'case'}],
					["position", { x: 100 + x*150, y: 100 + y*150, z:-100 }],
					["dropzone", { dropX: 100 + x*150, dropY: 100 + y*150, availableSpots:1 }] 
				);
			};
			
			var cases = [];
			
			for (var i = 0; i<3; i++)
			{		
				cases[i] = [];
				for (var j = 0; j<3; j++)
				{
					cases[i][j] = tttCase(i,j);			
				}
			}

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