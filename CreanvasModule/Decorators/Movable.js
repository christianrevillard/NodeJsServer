var applyTo = function(element, movableData)
{
	var socket = element.controller.clientSocket;
	var controller = element.controller;
	
	element.isMoving = false;
	
	console.log('adding elementEvent handler');

	socket.on('hitEvent' + element.id, function(message){
		console.log('received hitEvent on ' + element.id + ': ' + message);
		var eventData= JSON.parse(message);
				
		if (eventData.eventId == "pointerDown")
		{
			console.log("pointerDown on : " + element.id);
				
			console.log('startMoving: ' + element.id);
			element.isMoving = true;
		}
		else
		{
			console.log(eventData.eventId + ' hitEvent is not handled by movable');
		}
	});
	
	socket.on('touchEvent' + element.id, function(message){
		console.log('received touchEvent on ' + element.id + ': ' + message);
		var eventData= JSON.parse(message);

		if (eventData.eventId == "pointerMove")
		{
			if (!element.isMoving)
			{
				console.log('does not move anymore');
				return;
			};
			
			console.log('update ' + element.id + ' to ' + eventData.x + ',' + eventData.y);
			element.elementX = eventData.x;
			element.elementY = eventData.y;
			element.updated = true;
		}
		else if (eventData.eventId == "pointerUp")
		{
			console.log("pointerUp - stop moving on : " + element.id);
			element.isMoving = false;

		}
		else
		{
			console.log(eventData.eventId + ' touchEvent is not handled by movable');
		}
	});

};

exports.applyTo = applyTo;