var serverElement = require("./ServerElement");

this.elements = [];

var Controller  = function(ioof, socket) {
	
	var controller = this;
	
	controller.applicationSocket = ioof;
	controller.clientSocket = socket;
	
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
				// todo: for the same game == room
	//			console.log('need redraw: nb: ' + updates.length);
				ioof.emit('update', JSON.stringify(toSend));
				toUpdate.forEach(function(e){ e.updated = false; });
			}
			else
			{
//				console.log('need redraw: nb: ' + updates.length);
			}
		},
		40
	);

	this.emit = function(command, data)
	{
		ioof.emit(command, JSON.stringify(data));
	}
	
	
	socket.on('pointerEvent', function(message){

		console.log('Received pointerEvent: ' + message);
		
		var eventData= JSON.parse(message);
		
		var bubble = true;
	
		var identifierElement = controller.getElementByTouchIdentifier(eventData.touchIdentifier);
		
		if (identifierElement && identifierElement.handleIdentifierEvent)
		{
			console.log('Handling by identifier ' + identifierElement.id);
			identifierElement.handleIdentifierEvent(eventData);
		}
		
		eventData.hits.forEach(function(hitId){
			
			if (!bubble)
				return;

			var hit = controller.getElementById(hitId.id);

			if (!hit)
				return;

			if (!hit.handlePointerEvent)
				return;
			
			console.log('Checking hit on ' + hit.id);
			bubble = hit.handlePointerEvent(eventData, identifierElement);
		});
	});

/*	socket.on('decorate', function(message){
		console.log('received decorator registration: ' + message);
		
		var decorateMessage = JSON.parse(message);
		
		if (decorateMessage.decorator =='movable')
		{
			console.log('received decorator registration: movable for ' + decorateMessage.element);		
			
			// listen to pointerDown to startMove
			movable.push(decorateMessage.element);
			console.log("movable.length: " + movable.length);
		}
	});*/
		
  };

  /*
Controller.prototype.addElement = function(elementData, socket){		
	elementData.id = this.elements.length + 1; 
	this.elements.push({id:elementData.id, x:elementData.x, y:elementData.y});	
	socket.emit('addElement', JSON.stringify(elementData));
};*/


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
		console.log('Controller.addElement: ' + JSON.stringify(arguments));
	  var controller = this;
	  
	var args = [].slice.call(arguments);

	var identificationData = args.filter(function(arg){ return arg && arg[0]=="name";})[0] || ["name","Unknown"];
	var imageData = args.filter(function(arg){ return arg && arg[0]=="image";})[0]; // mandatory
	var positionData = args.filter(function(arg){ return arg && arg[0]=="position";})[0]; // mandatory
	
	var element = new serverElement.Element (controller, identificationData, imageData, positionData);

	element.id = controller.elements.length + 1;
	console.log('New element : ' + element.id);
	
	var decoratorArguments = args.filter(function(arg){ return arg && arg[0]!="name" && arg[0]!="position" && arg[0]!="image";});
	
	if (decoratorArguments.length > 0 )//&& CreJs.Creanvas.elementDecorators)
	{
		console.log('New element : apply ' + decoratorArguments.length + " decorators");
		element.applyElementDecorators.apply(element, decoratorArguments);
	}
	
	controller.elements.push(element);

	controller.emit(
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


exports.Controller = Controller;
//exports.addElement = addElement;
