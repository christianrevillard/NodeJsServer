var applyTo = function(element, duplicableData) {

	var socket = element.controller.clientSocket;
	var controller = element.controller;

	var isBlocked =  duplicableData["isBlocked"];
	var generatorCount = duplicableData["generatorCount"] || Infinity;
	
	console.log("duplicable.applyTo: generatorCount is " + generatorCount);				
				
	var requiresTouch = false;
	
	var makeCopy = function(e) {
						
		if (e.touchIdentifier>=0)
		{
			// we'll work with touchstart, not mousedown!
			requiresTouch = true;
		}

		if (requiresTouch && e.touchIdentifier<0)
			return;
		
		if (isBlocked && isBlocked()) 
			return;
		
		console.log('duplicable.makeCopy: GeneratorCount was: ' + generatorCount);

		if (generatorCount<=0) 
			return;

		generatorCount--;


		var copy = element.cloneElement(['duplicable']);
		copy.elementName+= " (duplicate)";

		copy.applyElementDecorator(
			"movable",
			{
				isBlocked : isBlocked,
				touchIdentifier: e.touchIdentifier
			});
		
	};
	
	socket.on('elementEvent', function(message){
		console.log('received pointerEvent: ' + message);
		var eventData= JSON.parse(message);
		
		if (eventData.elementId != element.id)
			return;
		
		if (eventData.eventId == "pointerDown")
		{
			console.log("pointerDown on : " + element.id);
				
			makeCopy(eventData);
		}
		else

		{
			console.log(eventData.eventId + ' is not handled by duplicable');
		}
	});
	
	//element.elementEvents.getEvent('pointerDown').addListener(makeCopy);			
};

exports.applyTo = applyTo;