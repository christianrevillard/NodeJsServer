var applyTo = function(element, movableData)
{
	var socket = element.controller.clientSocket;
	var controller = element.controller;
	
	var identifier = movableData.touchIdentifier;
	
	
	
	console.log('adding elementEvent handler');
	socket.on('elementEvent', function(message){
		console.log('received pointerEvent: ' + message);
		var eventData= JSON.parse(message);
		
		if (eventData.elementId != element.id)
			return;
		
		if (eventData.eventId == "pointerDown")
		{
			console.log("pointerDown on : " + element.id);
				
			console.log('startMoving: ' + element.id);
			identifier = eventData.touchIdentifier			
		}
		else

		{
			console.log(eventData.eventId + ' is not handled by movable');
		}
	});
	
	socket.on('pointerEvent', function(message){
		var eventData= JSON.parse(message);

		if (identifier != eventData.touchIdentifier)
			return;

		if (eventData.eventId == "pointerMove")
		{
			console.log('update ' + element.id + ' to ' + eventData.x + ',' + eventData.y);
			element.elementX = eventData.x;
			element.elementY = eventData.y;
			element.updated = true;
		}
		else if (eventData.eventId == "pointerUp")
		{
			console.log("pointerUp on : " + element.id);
			identifier = null;
		}
		else
		{
			console.log(eventData.eventId + ' is not handled by movable');
		}
	});

};

exports.applyTo = applyTo;