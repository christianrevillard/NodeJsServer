var Creanvas = Creanvas || {};		

Creanvas.Element = function(elementData){

	if (!elementData.hasOwnProperty('controller'))
	{
		return; // should throw error
	};

	if (!elementData.hasOwnProperty('draw'))
	{
		return; // should throw error
	};

	this.controller = elementData.controller;
	this.x = elementData.x || 0;
	this.y = elementData.y || 0;
	this.z = elementData.z || 0;
	this.draw = elementData.draw;	
	
	var element = this;
		
	this.controller.addEventListener('draw', function(e) {
		element.controller.context.beginPath();
		element.draw(element.controller.context);
		while(eventsToHandle.length>0)
		{
			eventsToHandle.shift()();
		}
		
	}, 
	element.z);

	
	var eventsToHandle = [];
	
	
	// not need if not event, but still very generic... 
	
	var isClicked = function(e){
		var canvasXY = element.controller.getCanvasXYFromClientXY(e.clientX, e.clientY);	
		element.controller.context.beginPath();
		element.draw(element.controller.context); // to recreate the path. - avoid redrawing all??
		// weakness: will only work with the last path in 'draw' function
		return element.controller.context.isPointInPath(
				canvasXY.x, 
				canvasXY.y);
	};

		
	// mouse events, not basic, should not be in basic element definition	
	
	this.controller.addEventListener('click', function(e) {
		if (isClicked(e))			
		{	
			//alert(name);		
		}
	}, 
	element.z);

	var isMoved = false;
	var movingFrom = null;
	
	var beginMove = function(e) {
		eventsToHandle.push(function()
				{		
					if (isClicked(e))
					{
						if (e.shiftKey)
						{ 				
							// copy before moving - must no handle the current event!		
							// is there a better way?
							setTimeout (
									function(){
							new Creanvas.Element(
									{ 
										controller: element.controller,
										x: element.x,
										y: element.y,
										draw: element.draw});},10);
						}
						
						isMoved = true;
						movingFrom = element.controller.getCanvasXYFromClientXY(e.clientX, e.clientY);	
					}
		});
	};
	
	this.controller.addEventListener('mousedown', beginMove);
	this.controller.addEventListener('touchstart', beginMove);


			
	var move = function(e) {
		eventsToHandle.push(function()
				{		
					if (isMoved)
					{
						var canvasXY = element.controller.getCanvasXYFromClientXY(e.clientX, e.clientY);	
						element.x += canvasXY.x-movingFrom.x;
						element.y += canvasXY.y-movingFrom.y;
						movingFrom = canvasXY;	
						element.triggerRedraw();
					}
				});
		element.triggerRedraw();
	};	

	this.controller.addEventListener('mousemove', move);
	this.controller.addEventListener('touchmove', move);

	var moveend = function(e) {
		eventsToHandle.push(function()
				{
		if (isMoved)
		{
			var canvasXY = element.controller.getCanvasXYFromClientXY(e.clientX, e.clientY);	
			element.x += canvasXY.x-movingFrom.x;
			element.y += canvasXY.y-movingFrom.y;
			isMoved = false;
			element.triggerRedraw();
		}});
		element.triggerRedraw();
	};
	this.controller.addEventListener('mouseup', moveend);
	this.controller.addEventListener('touchend', moveend);
};

Creanvas.Element.prototype.triggerRedraw = function()
{
	this.controller.redraw();
};

// specific elements, circles and stuff
 
// more advanced elements
