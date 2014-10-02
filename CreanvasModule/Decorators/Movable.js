var applyTo = function(element, movableData)
{
	var controller = element.controller;
	var isBlocked =  movableData["isBlocked"];
	
	element.isMoving = false;
	
	element.startMoving = function()
	{
		console.log('startMoving: ' + this.id  + ' from (' + this.elementX +',' + this.elementY +')');
		this.isMoving = true;
		this.originalZ = this.elementZ;
		this.elementZ += 100;
	};
	
	element.addEventListener(
		'pointerDown',
		function(eventData)
		{
			if (isBlocked && isBlocked(element, eventData.originSocketId)) 
				return;

			element.startMoving();

			if (eventData.identifierElement)
				eventData.identifierElement.touchIdentifier = null;
			
			if (element.dropZone)
			{
				element.dropZone.drag(element);
			}
			
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
//				console.log('is not moving');
				return true;
			};
			
			element.elementX = eventData.x;
			element.elementY = eventData.y;

//			console.log('Moving' + element.id  + ' to (' + element.elementX +',' + element.elementY +')');
			
			element.toUpdate = true;			
			return false;
		});

	element.addEventListener(
		'pointerUp',
		function(eventData)
		{
			if (isBlocked && isBlocked(element, eventData.originSocketId)) 
				return;

			console.log('StopMoving' + element.id  + ' at (' + element.elementX +',' + element.elementY +',' + element.elementZ +')');
			element.isMoving = false;
			element.elementZ = element.originalZ;
			console.log('StopMoving' + element.id  + ' at (' + element.elementX +',' + element.elementY +',' + element.elementZ +')');
			element.toUpdate = true;
			element.touchIdentifier = null;
			return false;
		});
};

exports.applyTo = applyTo;