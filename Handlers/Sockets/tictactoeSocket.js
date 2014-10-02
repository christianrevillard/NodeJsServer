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
			if (games.length == 0 || games[games.length-1].playerO)
			{			
				console.log('Starting a game' );
				games.push(new TicTacToeGame(tictactoe, socket, 'game' + games.length));
			}
			else
			{			
				console.log('Joining a game' );
				games[games.length-1].join(socket);
			}
		});
	});

	return tictactoe;
};

var TicTacToeGame = function(tictactoe, socket, gameName){
	var game = this;
	
	this.controller = new serverController.Controller(tictactoe, gameName)
	this.controller.addSocket(socket);	
	this.playerX = socket.id;	
	this.controller.socketEmit(socket.id, 'textMessage', {message:'New game, you are X'});

	this.blockedX = false;
	this.blockedO = true;

	this.ondropX = function(dropzone, dropped){ 
		game.blockedX = true; 
		game.blockedO = false;
		game.controller.applicationEmit('textMessage',  {message:'X has played !'});
		game.controller.socketEmit(game.playerO, 'textMessage',  {message:'Your turn !'});
		game.currentPlayer.elementY=325;
		game.currentPlayer.toUpdate = true;
		game.checkWin('X');
	};

	this.ondropO = function(dropzone, dropped){ 
		game.blockedO = true; 
		game.blockedX = false;
		game.controller.applicationEmit('textMessage',  {message:'O has played !'});
		game.controller.socketEmit(game.playerX, 'textMessage',  {message:'Your turn !'});
		game.currentPlayer.elementY=150;
		game.currentPlayer.toUpdate = true;		
		game.checkWin('O');
	};

	this.controller.addElement
	(
		["name", "Xsource"],
		["image", { "width":150,"height":150, "drawingMethod": 'X'}],
		["position", {"x": 600, "y": 150, "angle": Math.PI / 4}],			
		["duplicable", {"generatorCount":3, "isBlocked":function(element, originSocketId){return game.blockedX || originSocketId != game.playerX;}}],
		["droppable", {ondrop: game.ondropX}],
		["customTimer",{"time": 80, "action": function() { this.angle+= Math.PI / 32;}}]
	);

	this.currentPlayer = this.controller.addElement
	(
		["name", "currentPlayer"],
		["image", { "width":150,"height":150, "drawingMethod": 'currentPlayer'}],
		["position", {"x": 600, "y": 150, "z":-100}]
	);

	var tttCase = function(x,y)
	{
		return game.controller.addElement(
			["name", 'case(' + x + ',' + y + ')'],
			["image", { "top":0, "left":0, "width":150, "height":150, "drawingMethod":'case'}],
			["position", { x: 100 + x*150, y: 100 + y*150, z:-100 }],
			["dropzone", { dropX: 100 + x*150, dropY: 100 + y*150, availableSpots:1 }] 
		);
	};
					
	this.cases = [];

	for (var i = 0; i<3; i++)
	{		
		this.cases[i] = [];
		for (var j = 0; j<3; j++)
		{
			this.cases[i][j] = tttCase(i,j);			
		}
	}
};

TicTacToeGame.prototype.checkWin = function(drawingMethod){
	var played = [];
	
	for (var i = 0; i<3; i++) { for (var j = 0; j<3; j++) {		
		if (this.cases[i][j].droppedElementsList.length>0 && this.cases[i][j].droppedElementsList[0].drawingMethod == drawingMethod)
		{
			played.push({i:i, j:j, dropped: this.cases[i][j].droppedElementsList[0]});
		}
	}}
	
	if (played.length<3) return;				
	
	if ((played[0].i-played[1].i)*(played[0].j-played[2].j) == (played[0].j-played[1].j)*(played[0].i-played[2].i))
	{
		for(var k=0; k<3; k++)
		{
			played[k].dropped.controller.addElement
			(
				["name", "winner"],
				["image", { "width":150,"height":150, "drawingMethod": 'currentPlayer'}],
				["position", {"x": played[k].dropped.elementX, "y": played[k].dropped.elementY, "z":-50}]
			);
		}
		this.currentPlayer.elementY = drawingMethod=='X'?150:325;
		this.currentPlayer.toUpdate = true;
		this.controller.applicationEmit('textMessage',  {message:drawingMethod + ' has won !!!'});
		this.blockedX = true;
		this.blockedO = true;
	}
};

TicTacToeGame.prototype.join = function(socket){	
	var game = this;
	
	this.controller.addSocket(socket);
	this.controller.applicationBroadcast(socket, 'textMessage', {message:'O has joined'});
	this.controller.socketEmit(socket.id, 'textMessage', {message:'New game, you are O'});
	this.playerO = socket.id;

	this.controller.elements.forEach(function(e){ e.toUpdate = true; });
	
	this.controller.addElement
	(
		["name", "Osource"],
		["image", { "width":150,"height":150, "drawingMethod": 'O'}],
		["position", {"x": 600, "y": 325, "scaleX": 0.8, "scaleY": 1.2}],			
		["duplicable", {"generatorCount":3, "isBlocked":function(element, originSocketId){return game.blockedO || originSocketId != game.playerO;}}],
		["droppable", {ondrop: game.ondropO}]
	);
};


exports.connect = connect;
exports.isConnected = isConnected;