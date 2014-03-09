// TODO complete all properties of context.

var CreJs = CreJs || {};

(function(){
	CreJs.Creanvas = CreJs.Creanvas || {};		
		
	CreJs.Creanvas.NoDrawContext = function(context)
	{
		var noDrawContext = this;
		var isInPath = false;
		var canvasXY = null;
		
		// does not matter we do not draw!
		this.lineWidth = 0;
		this.lineCap= 0;
		this.fillStyle = 0;
		this.strokeStyle = 0;
		this.createRadialGradient = function() { return context.createLinearGradient(0,0,0,0);};
		this.createLinearGradient = function() { return context.createLinearGradient(0,0,0,0);};

		// moving is what it is all about
		this.moveTo  = function(a1,a2)  { return context.moveTo(a1, a2);};
		this.lineTo  = function(a1,a2)  { return context.lineTo(a1, a2);};
		this.bezierCurveTo = function(a1,a2,a3,a4,a5,a6) { return context.bezierCurveTo(a1,a2,a3,a4,a5,a6);};
		this.arc = function(a1,a2,a3,a4,a5) { return context.arc(a1,a2,a3,a4,a5);};
		this.closePath = function() { context.closePath();}
		
		// stop all actual drawing
		this.stroke = function(){};
		this.fill = function(){};
		this.fillRect = function(){};
		
		this.beginPath = function()
		{
			// we want to trigger if in a subpath too!
			isInPath = isInPath || context.isPointInPath(canvasXY.x, canvasXY.y);
			context.beginPath();
		};
		
		this.isPointInPath = function(element, draw, e){
			canvasXY = e;
			context.beginPath();
			isInPath = false;
			draw.call(element,noDrawContext);
			noDrawContext.beginPath();
			return isInPath;
		};
	};
}());