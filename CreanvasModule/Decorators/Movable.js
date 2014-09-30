var applyTo = function(element, movableData)
{
	var socket = element.controller.clientSocket;
	var controller = element.controller;
	
	element.isMoving = false;
	
	element.addEventListener(
		'pointerDown',
		function(eventData)
		{
			console.log('startMoving: ' + element.id);
			element.isMoving = true;

			if (eventData.identifierElement)
				eventData.identifierElement.touchIdentifier = null;
			
			element.touchIdentifier = eventData.touchIdentifier;
			return false;
		});

	element.addEventListener(
		'pointerMove',
		function(eventData)
		{
			if (!element.isMoving)
			{
				console.log('is not moving');
				return true;
			};
			
			console.log('update ' + element.id + ' to ' + eventData.x + ',' + eventData.y);
			element.elementX = eventData.x;
			element.elementY = eventData.y;
			element.updated = true;			
			return false;
		});

	element.addEventListener(
		'pointerUp',
		function(eventData)
		{
			console.log("pointerUp - stop moving on : " + element.id);
			element.isMoving = false;
			element.touchIdentifier = null;
			return false;
		});
};

exports.applyTo = applyTo;