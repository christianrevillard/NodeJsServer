var CreJs = CreJs || {};

(function(){
	CreJs.Creanvas = CreJs.Creanvas || {};		
		
	CreJs.Creanvas.Controller = function(controllerData) {
		var canvas, needRedraw, refreshTime, controller;

		controller = this;
		canvas = controllerData.canvas;

		var temporaryRenderingCanvas = canvas.ownerDocument.createElement('canvas');
			
		var temporaryRenderingContext = temporaryRenderingCanvas.getContext("2d");

			var images = [];
			images.push(temporaryRenderingContext.getImageData(0,0,temporaryRenderingCanvas.width,temporaryRenderingCanvas.height));

			temporaryRenderingContext.strokeStyle="#0F0";
			temporaryRenderingContext.stroke();
			images.push(temporaryRenderingContext.getImageData(0,0,temporaryRenderingCanvas.width,temporaryRenderingCanvas.height));

						
		//for heavy load stuff that can be handled by a worker / WebSocket
		var asynchronousController;
		if (window.Worker && (!controllerData.noWorker))
		{			
			asynchronousController = {};
			asynchronousController.worker = new Worker("js/Creanvas/AsynchronousControllerWorker.js");
			asynchronousController.receiveMessage = function(message){ asynchronousController.worker.postMessage(message);};
			asynchronousController.worker.onmessage = function(e){ asynchronousController.sendMessage(e.data)};
			asynchronousController.sendMessage = function(message) { controller.receiveMessage(message)};
		}
		else
		{
			// fall back to synchronous calls
			asynchronousController = new CreJs.Creanvas.HeavyLoadController();
			asynchronousController.sendMessage = function(message){ controller.receiveMessage(message)};
		}
		
		this.receiveMessage = function(message)
		{
			this.log("HeavyLoad: " + message);
		};
		
		this.sendMessage = function(message)
		{
			asynchronousController.receiveMessage(message);
		};
	
		
		this.sendMessage("Test heavy load");
		
		
		this.log = function(logData){
			if (controllerData.log)
				controllerData.log(logData);
		};
		
		this.log('Starting controller');

	
		controller.context = canvas.getContext("2d");	
		controller.noDrawContext = new CreJs.Creanvas.NoDrawContext(controller.context);
		needRedraw = true;
		isDrawing = false;
		refreshTime = controllerData.refreshTime || 50; // ms	

		
		this.triggerPointedElementEvent = function(eventId, event)
		{
			var hit = false;
			elements
			.filter(function(e){return e.canHandle(eventId);})
			.sort(function(a,b){return (b.z || 0 - a.z || 0);})
			.forEach(
					function(element)
					{
						
						if (hit)
							return;
						
						if (element.hit(event.x, event.y))
						{
							element.events.dispatch(eventId, event);
							hit = true;
						}
					}
				);
		};

		this.triggerElementEventByIdentifier = function(eventId, event)
		{
			elements
			.forEach(
					function(element)
					{							
						if (element.touchIdentifier == event.touchIdentifier)
						{
							element.events.dispatch(eventId, event);
						}
					}
				);
		};
		
		this.registerCanvasPointerEvent = function (controlEventId, customEventId)
		{

			canvas.addEventListener(controlEventId,
				function(event)
				{
					event.preventDefault();
					setTimeout(function()
					{	
						if (event.changedTouches)
						{
							event.changedTouches.forEach(function(touch){ 
								controller.log("Canvas event " + controlEventId + " with touchIdentifier " + touch.identifier);
								var eventData = controller.getCanvasXYFromClientXY(touch);
								eventData.touchIdentifier = touch.identifier;
								controller.triggerPointedElementEvent(customEventId, eventData)});
						}
						else
						{
							controller.log("Canvas event " + controlEventId);
							var eventData = controller.getCanvasXYFromClientXY(event);
							eventData.touchIdentifier = 0;
							controller.triggerPointedElementEvent(customEventId, eventData)
						}
					});
				});
		};
		
		this.registerTouchIdentifierEvent = function (controlEventId, customEventId)
		{
			canvas.addEventListener(
					controlEventId,
				function(event)
				{
					event.preventDefault();
					setTimeout(function()
					{	
						if (event.changedTouches)
						{
							event.changedTouches.forEach(function(touch){ 
								var eventData = controller.getCanvasXYFromClientXY(touch);
								eventData.touchIdentifier = touch.identifier;
								controller.triggerElementEventByIdentifier(customEventId, eventData);});
						}
						else
						{
							var eventData = controller.getCanvasXYFromClientXY(event);
							eventData.touchIdentifier = 0;
							controller.triggerElementEventByIdentifier(customEventId, eventData);							
						}
					},
					0);
				});
		};

		
		
		this.events = new CreJs.Creevents.EventContainer();		
		this.registerCanvasPointerEvent('click', 'click');
		// create two handlers... wrong

		this.registerCanvasPointerEvent('mousedown','pointerDown');
		this.registerCanvasPointerEvent('touchstart','pointerDown');

		this.registerTouchIdentifierEvent('mousemove','pointerMove');
		this.registerTouchIdentifierEvent('touchmove','pointerMove');

		this.registerTouchIdentifierEvent('mouseup','pointerUp');
		this.registerTouchIdentifierEvent('touchend','pointerUp');

		//this.registerPointerEvent('drop');

		var topElementEventsToHandle = [];
				
		this.stop = function()
		{
			controller.events.dispatch('deactivate');
			elements = [];
		};
	
		this.redraw = function()
		{
			needRedraw = true;
		};	
	
		this.getCanvasXYFromClientXY  = function(clientXY)
		{
			var boundings = canvas.getBoundingClientRect();
			return { 
				x: Math.round((clientXY.clientX-boundings.left) * canvas.width/boundings.width),
				y: Math.round((clientXY.clientY-boundings.top) * canvas.height/boundings.height)};		
		};
	
		var elements = [];
		
		this.addElement  = function (elementData)
		{
			elementData.controller = controller;

			temporaryRenderingCanvas.width = elementData.width;
			temporaryRenderingCanvas.height = elementData.height;
			temporaryRenderingContext.beginPath();
			
			var translate = elementData.translate || {dx:elementData.width/2, dy:elementData.height/2}			
			temporaryRenderingContext.translate(translate.dx, translate.dy);
			elementData.draw(temporaryRenderingContext);
			temporaryRenderingContext.translate(-translate.dx, -translate.dy);
			elementData.image = temporaryRenderingContext.getImageData(0, 0, temporaryRenderingCanvas.width, temporaryRenderingCanvas.height);
			var element = new CreJs.Creanvas.Element(elementData);
			element.dx = translate.dx;
			element.dy = translate.dy;
			elements.push(element);
			return element;
		};
			
		//background
		this.addElement({
			name:'background',
			width:canvas.width,
			height:canvas.height,
			translate:{dx:0, dy:0},
			draw: 
				controllerData.drawBackground ||  
				function (context) 
				{
					context.fillStyle = controllerData.backgroundStyle || "#FFF";
					context.fillRect(0,0,this.width,this.height);
				},
			z: -Infinity});
	
		setInterval(
				function()
				{
					if (needRedraw && !isDrawing)
					{
						needRedraw = false;
						isDrawing = true;
						
						elements
						.sort(function(a,b){return ((a.z || 0) - (b.z || 0));})
						.forEach(function(element)
						{
							//controller.log('rendering ' + element.name + ' (' + element.z+ ')');
							temporaryRenderingCanvas.width = element.image.width;
							temporaryRenderingCanvas.height = element.image.height;					
							temporaryRenderingContext.putImageData(element.image,0,0);
							controller.context.drawImage(
									temporaryRenderingCanvas,
									element.x - element.dx,
									element.y - element.dy);					
						});
					
						isDrawing = false;
						/*
						controller.events.dispatch(
								'draw', 
								{ 
									events:topElementEventsToHandle
								},
								function()
								{
									isDrawing = false;
									topElementEventsToHandle.forEach(
											function(te)
											{
												if (te.claimingElement)
													te.claimingElement.events.dispatch(te.eventId);
											});
									topElementEventsToHandle = []; // do the stuff!
								});*/
					}
				},
				refreshTime);
		

	};
}());