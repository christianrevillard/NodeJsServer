var serverElement = require("./ServerElement");

this.elements = [];

var Controller  = function(applicationSocket, applicationInstance) {
	
	var controller = this;
	
	controller.applicationSocket = applicationSocket;
	controller.applicationInstance = applicationInstance;
	
	controller.elements = [];
	var movable = [];
	var moving = [];
	
	console.log('Setting up for Creanvas');

	setInterval(
		function()
		{
			var toUpdate = 
				controller
				.elements
				.filter(function(e){ return e.updated; });
						
			if (toUpdate.length>0)
			{
				var toSend = toUpdate
				.map(function(e){
						return {
						id: e.id,
						x: e.elementX,
						y: e.elementY,
						z : e.elementZ,
						angle: e.elementAngle
					};});

				controller.applicationEmit('update', toSend);
				toUpdate.forEach(function(e){ e.updated = false; });
			}
		},
		50
	);

	this.applicationEmit = function(command, data)
	{
		applicationSocket.to(this.applicationInstance).emit(command, JSON.stringify(data));
	}
	
	this.applicationBroadcast = function(socket, command, data)
	{
		socket.broadcast.to(this.applicationInstance).emit(command, JSON.stringify(data));
	}

	this.socketEmit = function(socketId, command, data)
	{
		applicationSocket.to(socketId).emit(command, JSON.stringify(data));
	}
};

 Controller.prototype.getElementById = function (id){
	  var els = this.elements.filter(function(e){ return e.id == id;});
	  if (els.length==0)
		  return null;
	  return els[0];
  };

   Controller.prototype.getElementByTouchIdentifier = function(touchId)
   {
		var byIdentifier = this.elements.filter(function(e){return e.touchIdentifier == touchId;});
		return byIdentifier.length>0 ? byIdentifier[0] : null;
   };
	  
  Controller.prototype.addElement = function ()
 {
//		console.log('Controller.addElement: ' + JSON.stringify(arguments));
	  var controller = this;
	  
	var args = [].slice.call(arguments);

	var identificationData = args.filter(function(arg){ return arg && arg[0]=="name";})[0] || ["name","Unknown"];
	var imageData = args.filter(function(arg){ return arg && arg[0]=="image";})[0]; // mandatory
	var positionData = args.filter(function(arg){ return arg && arg[0]=="position";})[0]; // mandatory
	
	var element = new serverElement.Element (controller, identificationData, imageData, positionData);

	element.id = controller.elements.length + 1;
//	console.log('New element : ' + element.id);
	
	var decoratorArguments = args.filter(function(arg){ return arg && arg[0]!="name" && arg[0]!="position" && arg[0]!="image";});
	
	if (decoratorArguments.length > 0 )//&& CreJs.Creanvas.elementDecorators)
	{
//		console.log('New element : apply ' + decoratorArguments.length + " decorators");
		element.applyElementDecorators.apply(element, decoratorArguments);
	}
	
	controller.elements.push(element);

	// only on the current? or change the join process... to see...
	// should be: add on all. Have a system to add existing elment to application that can be joined after start.
	controller.applicationEmit(
			'addElement', 
			{
				id:element.id, 
				x:element.elementX,
				y:element.elementY, 
				z:element.elementZ,
				angle:element.elementAngle,
				width:element.elementWidth,
				height:element.elementHeight,
				drawingMethod:element.drawingMethod});

	return element;
};

Controller.prototype.addSocket = function (socket)
{
	var controller = this;

	socket.join(this.applicationInstance);

	socket.on('pointerEvent', function(message){
		
		var eventData= JSON.parse(message);
		
		var bubble = true;
	
		eventData.identifierElement = controller.getElementByTouchIdentifier(eventData.touchIdentifier);
		eventData.originSocketId = socket.id;
		
		if (eventData.identifierElement)
		{
			eventData.identifierElement.triggerEvent(eventData);
		}
		
		eventData.hits.forEach(function(hitId){
			
			if (!bubble)
				return;
			
			if (eventData.identifierElement && hitId.id == eventData.identifierElement.id)
				return;

			var hit = controller.getElementById(hitId.id);

			if (!hit)
				return;
			
			bubble = hit.triggerEvent(eventData);
		});
	});

};


exports.Controller = Controller;
