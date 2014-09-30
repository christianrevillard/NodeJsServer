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
			});
		
		copy.touchIdentifier =  e.touchIdentifier; // how to handle this back to client?? => emit something
		copy.isMoving = true;
	};
		

	element.addEventListener(
		'pointerDown',
		function(eventData)
		{
			console.log("pointerDown on : " + element.id);			
			makeCopy(eventData);			
			return false;
		});	
};

exports.applyTo = applyTo;