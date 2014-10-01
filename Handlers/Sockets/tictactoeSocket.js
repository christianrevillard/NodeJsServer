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
				var cases = [];

				var checkWin = function(cases, drawingMethod)
				{
					var played = [];
					
					for (var i = 0; i<3; i++)
					{		
						for (var j = 0; j<3; j++)
						{		
							if (cases[i][j].droppedElementsList.length>0 && cases[i][j].droppedElementsList[0].drawingMethod == drawingMethod)
							{
								played.push({i:i, j:j, dropped: cases[i][j].droppedElementsList[0]});
							}
						}
					}
					
					if (played.length<3)
					{
						console.log(played.length)
						return;				
					}
					
					if ((played[0].i-played[1].i)*(played[0].j-played[2].j) ==
						(played[0].j-played[1].j)*(played[0].i-played[2].i))
					{
						console.log('it is a win')
						
						for(var k=0; k<3; k++)
						{
							played[k].dropped.controller.addElement
							(
								["name", "winner"],
								["image", { "width":150,"height":150, "drawingMethod": 'currentPlayer'}],
								["position", {"x": played[k].dropped.elementX, "y": played[k].dropped.elementY, "z":-50}]
							);
						}
						currentPlayer.elementY = drawingMethod=='X'?150:325;
						controller.applicationEmit('textMessage',  {message:drawingMethod + ' has won !!!'});
						blockedX =true;
						blockedO = true;
					}
				};

				var ondropX = function(dropzone, dropped){ 
					blockedX = true; 
					blockedO=false;
					controller.applicationEmit('textMessage',  {message:'X has played !'});
					controller.socketEmit(playerO, 'textMessage',  {message:'Your turn !'});
					currentPlayer.elementY=325;
					currentPlayer.updated = true;
					
					checkWin(cases, 'X');
				};

				var ondropO = function(dropzone, dropped){ 
					blockedO = true; 
					blockedX=false;
					controller.applicationEmit('textMessage',  {message:'O has played !'});
					controller.socketEmit(playerX, 'textMessage',  {message:'Your turn !'});
					currentPlayer.elementY=150;
					currentPlayer.updated = true;
					
					checkWin(cases, 'O');
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

				var currentPlayer = controller.addElement
				(
					["name", "currentPlayer"],
					["image", { "width":150,"height":150, "drawingMethod": 'currentPlayer'}],
					["position", {"x": 600, "y": 150, "z":-100}]
				);

				var tttCase = function(x,y)
				{
					return controller.addElement(
						["name", 'case(' + x + ',' + y + ')'],
						["image", { "top":0, "left":0, "width":150, "height":150, "drawingMethod":'case'}],
						["position", { x: 100 + x*150, y: 100 + y*150, z:-100 }],
						["dropzone", { dropX: 100 + x*150, dropY: 100 + y*150, availableSpots:1 }] 
					);
				};
								
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