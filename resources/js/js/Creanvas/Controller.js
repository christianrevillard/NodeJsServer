var CreJs = CreJs || {};

(function(){
	CreJs.Creanvas = CreJs.Creanvas || {};		
		
	CreJs.Creanvas.Controller = function(controllerData) {
		var canvas, needRedraw, refreshTime, controller;

		var writeToLog = controllerData.log;
		
		this.log = function(logData){
			if (!writeToLog )
				return;

			writeToLog(logData);
		};
		
		this.log('Starting controller');

		controller = this;
	
		canvas = controllerData.canvas;
		controller.context = canvas.getContext("2d");	
		controller.noDrawContext = new CreJs.Creanvas.NoDrawContext(controller.context);
		needRedraw = true;	
		refreshTime = controllerData.refreshTime || 50; // ms	
	
		this.events = new CreJs.Creevents.EventContainer(writeToLog);		
		this.events.registerControlEvent(canvas, 'click', 'click');
		this.events.registerControlEvent(canvas, 'mousedown','pointerDown');
		this.events.registerControlEvent(canvas, 'mouseup','pointerUp');
		this.events.registerControlEvent(canvas, 'mousemove','pointerMove');
		this.events.registerControlEvent(canvas, 'touchstart','pointerDown');
		this.events.registerControlEvent(canvas, 'touchend','pointerUp');
		this.events.registerControlEvent(canvas, 'touchmove','pointerMove');
		this.events.registerControlEvent(canvas, 'touchcancel','pointerCancel');
				
		this.stop = function()
		{
			controller.events.dispatch('deactivate');
		};
	
		this.redraw = function()
		{
			needRedraw = true;
		};	
	
		this.getCanvasXYFromClientXY  = function(clientXY)
		{
			var boundings = canvas.getBoundingClientRect();
			return { 
				x: (clientXY.clientX-boundings.left) * canvas.width/boundings.width,
				y: (clientXY.clientY-boundings.top) * canvas.height/boundings.height};		
		};
	
		this.addElement  = function (elementData)
		{
			elementData.controller = controller;
	
			var element = new CreJs.Creanvas.Element(elementData);
							
			return element;
		};
			
		//background
		this.addElement({
			draw: 
				controllerData.drawBackground ||  
				function (context) 
				{
					context.fillStyle = controllerData.backgroundStyle || "#FFF";
					context.fillRect(0,0,canvas.width,canvas.height);
				},
			z: -Infinity});
	
		setInterval(
				function()
				{
					if (needRedraw)
					{
						needRedraw = false;
						controller.events.dispatch('draw');
					}
				},
				refreshTime);
	};
}());