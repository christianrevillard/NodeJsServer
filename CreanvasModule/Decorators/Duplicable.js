var applyTo = function(element, duplicableData) {

	var socket = element.controller.clientSocket;
	var controller = element.controller;

	var isBlocked =  duplicableData["isBlocked"];
	var generatorCount = duplicableData["generatorCount"] || Infinity;
	
	console.log("duplicable.applyTo: generatorCount is " + generatorCount);				
			
	// check this with tablet later
//	var requiresTouch = false;
	
	var makeCopy = function(e) {
	/*					
		if (e.touchIdentifier>=0)
		{
			// we'll work with touchstart, not mousedown!
			requiresTouch = true;
		}

		if (requiresTouch && e.touchIdentifier<0)
			return;
		*/
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
				touchIdentifier: e.touchIdentifier // how to handle this back to client?? => emit something
			});
		
	};
	
	console.log('Listening to hitEvent' + element.id );
	
	// what is the problem then???
	
	socket.on('hitEvent' + element.id, function(message){
		console.log('received hitEvent on ' + element.id + ': ' + message);

		var eventData= JSON.parse(message);
				
		if (eventData.eventId == "pointerDown")
		{
			console.log("pointerDown on : " + element.id);
				
			makeCopy(eventData);
		}
		else

		{
			console.log(eventData.eventId + ' hitEvent is not handled by duplicable');
		}
	});
	
	//element.elementEvents.getEvent('pointerDown').addListener(makeCopy);			
};

exports.applyTo = applyTo;