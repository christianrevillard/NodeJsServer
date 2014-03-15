var CreJs = CreJs || {};

(function(){
	CreJs.Creanvas = CreJs.Creanvas || {};		
		
	
	// role: listen to event data
	
	// update the image from the source
	
	// forward events to
	// - thread
	// - worker
	
	// expose methods usable from mainpage
	// - addElement
	// - stop
	// - element.addEventListener
	// - addRules

	
	CreJs.Creanvas.Creanvas = function(creanvasData) {

		var that = this;
		var controller;
		//could use a WebSocket too, server side computing
		if (window.Worker && (!creanvasData.noWorker))
		{			
			controller = {};
			controller.worker = new Worker("js2/Creanvas/ControllerWorker.js");
			// Controller receives message from GUI
			controller.receiveMessage = function(message){ controller.worker.postMessage(message);};
			controller.worker.onmessage = function(e){controller.sendMessage(e.data)};
			controller.sendMessage = function(message){
				that.receiveMessage(message)};
		}
		else
		{
			controller = new CreJs.Creanvas.Controller();
			controller.sendMessage = function(message){
				that.receiveMessage(message)};
		}
		
		
		// creanvas.sendMessageToController() # controler.receiveMessage
		// controller.sendMessageToCanvas() = controller.sendMessage .. but defined here, litt rotete
		// this.receiveMessage(), 
		
		var newImageReady = false;

		this.receiveMessage = function(message)
		{
			setTimeout(
				function()
				{
					if (message.command == "updateImage")
					{
						
						elements.filter(function(e){return e.id == message.element.id;}).forEach(
						function(e)
						{
							e.imageIndex = message.element.imageIndex || e.imageIndex;
							e.x = message.element.x || e.x; 
							e.y = message.element.y || e.y;							
						}); 						
						newImageReady = true;
					}
				},0);
			
		};
		
		this.sendMessage = function(message)
		{
			controller.receiveMessage(message);
		};
	
	
		
		var temporaryRenderingCanvas = document.createElement('canvas');
		var temporaryRenderingContext = temporaryRenderingCanvas.getContext("2d");

		{
			// fixing first element
			temporaryRenderingCanvas.width = 100;
			temporaryRenderingCanvas.height = 100;
			temporaryRenderingContext.strokeStyle="#F00";
			temporaryRenderingContext.lineWidth=3;
			temporaryRenderingContext.moveTo(0,0);
			temporaryRenderingContext.lineTo(100,100)
			temporaryRenderingContext.stroke();

			var images = [];
			images.push(temporaryRenderingContext.getImageData(0,0,temporaryRenderingCanvas.width,temporaryRenderingCanvas.height));

			temporaryRenderingContext.strokeStyle="#0F0";
			temporaryRenderingContext.stroke();
			images.push(temporaryRenderingContext.getImageData(0,0,temporaryRenderingCanvas.width,temporaryRenderingCanvas.height));

			var elements = [];
			elements.push(
					{
						id:'abc',
						x:100, 
						y:200, 
						z:1, 
						images:images,						
						imageIndex:0,
/*
 * cannot pass a function at all... -any way to define a simple move to apply by the worker / server?
 * 						rules:[
						       function(element){
						    	   setInterval(
						    			   function(){
						    				   element.x++;
						    			   }
						    			   ,1000);
						       }
						       
						       ]*/
						       });
		}		

		{
			// fixing second element
			temporaryRenderingCanvas.width  = 200;
			temporaryRenderingCanvas.height = 100;
			temporaryRenderingContext.clearRect(0,0,200,100);
			temporaryRenderingContext.strokeStyle="#00F";
			temporaryRenderingContext.lineWidth=3;
			temporaryRenderingContext.moveTo(200,0);
			temporaryRenderingContext.lineTo(0,100)
			temporaryRenderingContext.stroke();

			elements.push(
					{
						id:'def',
						x:150, 
						y:250, 
						z:0, 
						images:[temporaryRenderingContext.getImageData(0,0,temporaryRenderingCanvas.width,temporaryRenderingCanvas.height)],
						imageIndex:0});
		}		

		var x=function(){return 1;};
		
		this.sendMessage(x);

		this.sendMessage({
			command:"initialImage",
			element: elements[0]
		});
		
		this.sendMessage({
			command:"initialImage",
			element: elements[1]
		});
				
		var context = creanvasData.canvas.getContext("2d");
				
		var newImage = null;

		// Naiv click handling, to improve 
		
		this.handleClick = function(e)
		{
			setTimeout(
				function(){
			that.sendMessage({clientX:e.clientX, clientY:e.clientY});
					}
				);
		};
								
		var checkUpdatedImage = 
			setInterval(
				function()
				{
					if (newImageReady)
					{
						elements
						.sort(function(a,b) { return a.z - b.z; })
						.forEach(function(e)
						{
							temporaryRenderingCanvas.width = e.images[e.imageIndex].width;
							temporaryRenderingCanvas.height = e.images[e.imageIndex].height;					
							temporaryRenderingContext.putImageData(e.images[e.imageIndex],0,0);
							context.drawImage(temporaryRenderingCanvas,e.x,e.y);
						});
					}
					
				},50);
		
		
	}
}());