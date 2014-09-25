var addCreanvas = function(socket) {
	
	var elements = [];
	var movable = [];
	var moving = [];
	
	console.log('Setting up for Creanvas');

	socket.on('dispatchEvent', function(message){
		console.log('received dispatchEvent: ' + message);
		var eventData= JSON.parse(message);
		
		if (eventData.event == "pointerDown")
		{
			console.log("movable.length: " + movable.length);

			var movableClicked = elements.filter(function(e){ return e.id == eventData.element });
			if (movableClicked.length>0)
			{
				console.log('startMoving: ' + movableClicked[0].id);
				moving[eventData.touchIdentifier] =  movableClicked[0].id;
			}
			else
			{
				console.log(eventData.element + ' not registered as movable');
			}
		}
		else if (eventData.event == "pointerMove")
		{
			if (moving[eventData.touchIdentifier])
			{
				socket.emit('moved', JSON.stringify({
					"element":moving[eventData.touchIdentifier], 
					"x":eventData.x,
					"y":eventData.y}));
			}
		}
		else
		{
			console.log(eventData.event + ' is not handled');
		}
	//	socket.emit('played', 'Event registered: element: ' + stuff.element + ', event: ' + stuff.event);
	});

	socket.on('registerElement', function(message){
		console.log('received register : ' + message);
		var elementData = JSON.parse(message);
		elements.push({id:elementData.id, x:elementData.x, y:elementData.y});
	});

	socket.on('decorate', function(message){
		console.log('received decorator registration: ' + message);
		
		var decorateMessage = JSON.parse(message);
		
		if (decorateMessage.decorator =='movable')
		{
			console.log('received decorator registration: movable for ' + decorateMessage.element);		
			
			// listen to pointerDown to startMove
			movable.push(decorateMessage.element);
			console.log("movable.length: " + movable.length);
		}
	});
	
  };

exports.addCreanvas = addCreanvas;
