var applyTo = function(element, dropzoneData)
{
	var socket = element.controller.clientSocket;

	var availableSpots = dropzoneData["availableSpots"];
	var dropX = dropzoneData["dropX"];
	var dropY = dropzoneData["dropY"];
	
	element.droppedElementsList = [];

	// element and Event???

	socket.on('hitEvent' + element.id, function(message){
		console.log('received hitEvent' + element.id + '('+ dropX +',' + dropY + ') : ' + message);
		var eventData= JSON.parse(message);
		
		if (eventData.eventId == "pointerUp" && eventData.touchElementId>-1 )
		{
			var dropped = element.controller.getElementById(eventData.touchElementId);
			
			if (!dropped || !dropped.isDroppable)
			{
				console.log((!dropped)?('not found '+ eventData.touchElementId):'not droppable');
				return;
			}

			element.droppedElementsList.push(dropped);
			
			dropped.dropZone = element;
			

			console.log('Element' + dropped.id + ' was at (' + dropped.elementX + ',' + dropped.elementY + ')');
			
			if (dropX) dropped.elementX = dropX;
			if (dropY) dropped.elementY = dropY;
			
			console.log('Element' + dropped.id + ' is now at (' + dropped.elementX + ',' + dropped.elementY + ')');
			dropped.updaed = true;
			//identifier = eventData.touchIdentifier			
		}
		else

		{
			console.log(eventData.eventId + ' is not handled by movable');
		}
	});	

	
/*	
	socket.on('elementEvent', function(message){
		console.log('received pointerEvent: ' + message);
		var eventData= JSON.parse(message);
		
		if (eventData.elementId != element.id)
			return;
		
		if (eventData.eventId == "pointerUp")
		{
			console.log("pointerUp on : " + element.id);
				
			// how do I know?
			
			
			
			console.log('startMoving: ' + element.id);
			identifier = eventData.touchIdentifier			
		}
		else

		{
			console.log(eventData.eventId + ' is not handled by movable');
		}
	});	
	
	
	
	
	
	var drop = function(e) {
		
		if (availableSpots <= 0)
			return
							
		console.log('dropzone.drop - dropping: ' + e.droppedElement.id);

		availableSpots--;
		e.droppedElement.x = dropX || element.elementX;
		e.droppedElement.y = dropY || element.elementY;
		e.droppedElement.dropZone = element;
		element.droppedElementsList.push(e.droppedElement);

		/*e.droppedElement.elementEvents.getEvent('dropped').dispatch({dropZone:element, droppedElement:e.droppedElement});
		element.elementEvents.getEvent('droppedIn').dispatch({"dropZone":element, "droppedElement":e.droppedElement});
		element.triggerRedraw();
	};

//	element.elementEvents.getEvent('drop').addListener(drop);

	element.drag = function(draggedElement) {

		console.log('dropzone.drag - dragging  ' + draggedElement.id);
		
		draggedElement.dropZone = null;
		availableSpots++;
		element.droppedElementsList.splice(
				element.droppedElementsList.indexOf(draggedElement),1);	

//		element.triggerRedraw();
	};
	
	//Object.defineProperty(element, "droppedElements", { get: function() {return element.droppedElementsList; }});
	
	*/
};

exports.applyTo = applyTo;