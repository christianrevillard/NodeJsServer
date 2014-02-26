var startStuff = function (){
	var theCanvas = document.getElementById('theCanvas');

	var centerX = 0;
	var centerY = 0;
	var centerM = 1;
	var radius = 5;
	
	var context = theCanvas.getContext("2d");		
	context.strokeStyle='#0FF';
	context.fillStyle='#FFF';

	theCanvas.addEventListener(
		"click",
		function(event)
		{
			if (event.shiftKey)
			{
				startPath(event.clientX, event.clientY);
				return;
			}
			centerX = event.clientX;
			centerY = event.clientY;			
		}
	);

	var drawStuff= function (X, Y, style)
	{
		context.beginPath();
		context.arc(X,Y,radius,0,2*Math.PI);
		context.strokeStyle = style;
		context.lineWidth=2;
		context.stroke();
	}

	var paths = []
	
	var startPath = function(startX, startY)
	{
		var X=startX;
		var Y=startY;

		var vX=0.1;
		var vY=0;

		var aX=0;
		var aY=0;
		
		
		var m = 1;
		var myIndex;
		
		var lastTime = Date.now();
		
		var updateMyPosition = window.setInterval(
				function()
				{
					var dt = Date.now()-lastTime;

					var r = Math.sqrt(Math.pow(centerX-X,2)+Math.pow(centerY-Y,2))
					
					aX = centerM/Math.pow(r,3)*(centerX-X);
					aY = centerM/Math.pow(r,3)*(centerY-Y);
					
					vX += aX*dt;
					vY += aY*dt;
					
					X+= 0.9*vX*dt;
					Y+= 0.9*vY*dt;

					if (r<2*radius || X<0 || Y<0 || X>800 || Y > 600)
					{
						// crash, or out of the system
						clearInterval(updateMyPosition);
						paths[myIndex] = null;
						return;
					}
					
					lastTime = Date.now();
				},
				100);

		var drawMyself =function()
				{
			drawStuff(X, Y, "#00f");
		}
		
		paths.push(drawMyself);		
		myIndex = paths.length;
	};

	
	var redraw = function()
	{
		drawStuff(centerX, centerY, "#f00");

		for (var i=0; i<paths.length; i++)
		{
			if (paths[i])
				paths[i]();
		}
	};	
	
	window.setInterval(
	function(event)
	{
		context.beginPath();
		context.fillStyle='#FFF';
		context.fillRect(0,0,800,600);
		redraw();
	},
	100);
	
};
