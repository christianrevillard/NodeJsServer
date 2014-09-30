var applyTo = function(element, movableData)
{
	var controller = element.controller;
	var isBlocked =  movableData["isBlocked"];
	
	element.isMoving = false;
	
	element.addEventListener(
		'pointerDown',
		function(eventData)
		{
			if (isBlocked && isBlocked(element, eventData.originSocketId)) 
				return;

			console.log('startMoving: ' + element.id  + ' from (' + element.elementX +',' + element.elementY +')');
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
			if (isBlocked && isBlocked(element, eventData.originSocketId)) 
				return;

			if (!element.isMoving)
			{
				console.log('is not moving');
				return true;
			};
			
			element.elementX = eventData.x;
			element.elementY = eventData.y;

			console.log('Moving' + element.id  + ' to (' + element.elementX +',' + element.elementY +')');
			
			element.updated = true;			
			return false;
		});

	element.addEventListener(
		'pointerUp',
		function(eventData)
		{
			if (isBlocked && isBlocked(element, eventData.originSocketId)) 
				return;

			console.log('StopMoving' + element.id  + ' at (' + element.elementX +',' + element.elementY +')');
			element.isMoving = false;
			element.touchIdentifier = null;
			return false;
		});
};

exports.applyTo = applyTo;