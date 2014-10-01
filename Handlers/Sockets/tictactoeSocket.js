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
  
		socket.on('joinGame', function()
		{
			var controller;
			var playerX;
			var playerO;
			
			if (games.length == 0 || games[games.length-1].playerO)
			{			
				console.log('starting a game' );							
				controller = new serverController.Controller(tictactoe, 'game' + games.length)
				controller.addSocket(socket);
				playerX = socket.id;
				games.push({playerX:playerX,controller:controller});
				
				controller.socketEmit(socket.id, 'textMessage', {message:'New game, you are X'});
			}
			else
			{			
				// adding elements when everubody here
				// for games that can be joined after start, we need an addExitingElement stuff
				console.log('joining a game' );
				controller = games[games.length-1].controller;
				controller.addSocket(socket);
				controller.applicationBroadcast(socket, 'textMessage', {message:'O has joined'});
				controller.socketEmit(socket.id, 'textMessage', {message:'New game, you are O'});
				playerX = games[games.length-1].playerX;
				playerO = games[games.length-1].playerO = socket.id;

				var blockedX = false;
				var blockedO = true;
				
				var ondropX = function(dropzone, dropped){ 
					blockedX = true; 
					blockedO=false;
					controller.applicationEmit('textMessage',  {message:'X has played !'});
					controller.socketEmit(playerO, 'textMessage',  {message:'Your turn !'});
				};

				var ondropO = function(dropzone, dropped){ 
					blockedO = true; 
					blockedX=false;
					controller.applicationEmit('textMessage',  {message:'O has played !'});
					controller.socketEmit(playerX, 'textMessage',  {message:'Your turn !'});
				};

				controller.addElement
				(
					["name", "Xsource"],
					["image", { "width":150,"height":150, "drawingMethod": 'X'}],
					["position", {"x": 600, "y": 150, "angle": Math.PI / 4}],			
					["duplicable", {"generatorCount":3, "isBlocked":function(element, originSocketId){return blockedX || originSocketId != playerX;}}],
					["droppable", {ondrop: ondropX}],
					["customTimer",{"time": 80, "action": function() { this.angle+= Math.PI / 32;}}]
				);

				controller.addElement
				(
					["name", "Osource"],
					["image", { "width":150,"height":150, "drawingMethod": 'O'}],
					["position", {"x": 600, "y": 325, "scaleX": 0.8, "scaleY": 1.2}],			
					["duplicable", {"generatorCount":3, "isBlocked":function(element, originSocketId){return blockedO || originSocketId != playerO;}}],
					["droppable", {ondrop: ondropO}]
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
			}
		});
	});

	return tictactoe;
};

exports.connect = connect;
exports.isConnected = isConnected;