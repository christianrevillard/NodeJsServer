var onload = function ()
{		
	var theCanvas = document.getElementById('theCanvas');
	var controller;
	
	var setUp = function()
	{
		controller = new CreJs.Creanvas.Controller(
		{
			"noWorker":true,
			"canvas":theCanvas, 
			"log": new CreJs.Crelog.Logger().logMessage,
			"timeScale":1,
			"meterPerPoint":1,
			"refreshTime":100				
		});
		
	var buttonData	= {
			"name":'button',
			"image":
			{
				"width":50,
				"height":50,
				"scaleX":1,
				"scaleY":1,
				"draw": function (context) 
				{
					var color1, color2;
					color1 =  "#AAF";
					color2= "#DDD";
	
					context.arc(0,0,20,0,2*Math.PI);
					var gradient = context.createRadialGradient(0,0,50,50,-5,3);
					gradient.addColorStop(0.0,color1);
					gradient.addColorStop(1.0,color2);
					context.fillStyle = gradient;
					context.fill();
				}
			},
			"position":
			{
				"x": 200,
				"y": 600
			},
	};

	var flip1 = controller.addElement(buttonData);
	flip1.x = 200;
	flip1.y = 580;
	flip1.scaleX=3;
	flip1.scaleY=0.5;
	flip1.angle = Math.PI/4;

	var flip2 = controller.addElement(buttonData);
	flip2.x = 300;
	flip2.y = 580;
	flip2.scaleX=3;
	flip2.scaleY=0.5;
	flip2.angle = -Math.PI/4;

	var button1 = controller.addElement(
			buttonData,
			["solid",{collisionCoefficient:1,mass:Infinity}]);

	var button2 = controller.addElement(
			buttonData,
			["solid",{collisionCoefficient:1,mass:Infinity}]);
	button2.x = 300;
	button2.y = 600;

	var elementDataWall	= {
			name:'wall',
			image:{
				width:10,
				height:700,
				translate:{dx:0,dy:0},
				draw: function (context) 
				{
					var color1, color2;
					color1 =  "#AAF";
					color2= "#DDD";
					context.moveTo(0,0);
					context.lineTo(10,0);
					context.lineTo(10,500);
					context.lineTo(0,500);
					context.closePath();
					var gradient = context.createRadialGradient(0,0,45,-10,-5,3);
					gradient.addColorStop(0.0,color1);
					gradient.addColorStop(1.0,color2);
					context.fillStyle = gradient;
					context.fill();
				}
			},
			position:{
				x: 5,
				y: 5}
	};
	
	var left = controller.addElement(elementDataWall,["solid",{collisionCoefficient:1}]);
	var top = controller.addElement(elementDataWall,["solid",{collisionCoefficient:1}]);
	var right = controller.addElement(elementDataWall,["solid",{collisionCoefficient:1}]);

	right.x = 490;

	top.angle =  -Math.PI/2;
	top.x = 0;
	top.y = 5;
	top.scaleY = 500/700;

	left.solid.mass = top.solid.mass = right.solid.mass = Infinity;
};
	
	setUp();
	
	// fix Galaxy Chrome scrolling bug
	document.addEventListener(
		"touchmove", function touchHandlerDummy(e)
		{
		    e.preventDefault();
		    return false;
		},
		false);	
};