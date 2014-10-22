var serverController = require('../../CreanvasModule/ServerController');

var games = [];

// called only for the first of all users
var startApplication = function(socketName) {

	var collision = exports.applicationSocket = socketName;

	console.log('Setting up collision socket ');
	
	collision.on('connection', function(socket){
		
		console.log('user connected: ' + socket.id);
				
		socket.on('disconnect', function(){
			console.log('user disconnected');});

		// single user room stuff 
		new CollisionTest(collision, socket)
	});
};

var CollisionTest = function(collision, socket){
	var game = this;
	
	// each user gets a new room
	this.controller = new serverController.Controller(collision, socket.id)
	this.controller.addSocket(socket);	

	this.controller.addElement
	(
		["name", "round1"],
		["image", { "width":200,"height":200, "typeName": 'round'}],
		["position", {"x": 100, "y": 250}],			
		["solid", {}],
		["clickable", {}],
		["moving", {vx:100}]
	);

	this.controller.addElement
	(
		["name", "round2"],
		["image", { "width":200,"height":200, "typeName": 'round'}],
		["position", {"x": 600, "y": 250}],			
		["solid", {}],
		["moving", {vx:-100}]
	);
};

exports.startApplication = startApplication;
exports.applicationSocket = null;