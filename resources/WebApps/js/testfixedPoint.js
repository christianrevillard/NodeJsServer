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
			"timeScale":0.1,
			"lengthScale":2,
			"refreshTime":100				
		});
		

		var drawRound = function (context) 
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
		};

		var drawFixed = function (context) 
		{
			var color1, color2;
			color1 =  "#AAF";
			color2= "#DDD";

			context.arc(0,20,20,0,2*Math.PI);
			var gradient = context.createRadialGradient(0,0,50,50,-5,3);
			gradient.addColorStop(0.0,color1);
			gradient.addColorStop(1.0,color2);
			context.fillStyle = gradient;
			context.fill();
		};

	var element1 = controller.addElement(
			["name",'O1'],
			["image", {"width":50,"height":50,"scaleX":2,"scaleY":2,"draw": drawRound}],
			["position", {"x": 100,"y": 250 }],
			["solid",{collisionCoefficient:1}],
			["moving",{"vx":1,"vy":0 }]);
		
	var testFixedPoint = controller.addElement(
			["name",'F1'],
			["image", {"left":-25, "right":25, "top":-5, "bottom":45, "scaleX":0.5,"scaleY":5,"draw": drawFixed}],
			["position", {"x": 350,"y": 125 }],
			["solid",{"fixedPoint":true}],
			["moving",{"rotationSpeed":0.01 }]);	

	var testFixedPoint2 = controller.addElement(
			["name",'F2'],
			["image", {"left":-25, "right":25, "top":-5, "bottom":45, "scaleX":0.5,"scaleY":3,"draw": drawFixed}],
			["position", {"x": 350,"y": 330}],
			["solid",{"fixedPoint":true}],
			["moving",{"rotationSpeed":0.01 }]);	

	var drawWall = function(context) 
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
	};
		
	var left = controller.addElement(
			["name", "wall"],
			["image",
				 {
					width:10,
					height:500,
					top:0, 
					left:0,
					draw: drawWall 
				 }
			],
			["position", {x:5, y:5}],
			["solid",{collisionCoefficient:1, "fixed":true}]);
	
	var top = controller.addElement(
			["name", "wall"],
			["image",
				 {
					width:10,
					height:500,
					top:0, 
					left:0,
					draw: drawWall, 
					scaleY: 700/500
				 }
			],
			["position", {x:0, y:5, angle:-Math.PI/2}],
			["solid",{collisionCoefficient:1, "fixed":true}]);

	var right = controller.addElement(
			["name", "wall"],
			["image",
				 {
					width:10,
					height:500,
					top:0, 
					left:0,
					draw: drawWall 
				 }
			],
			["position", {x:690, y:5}],
			["solid",{collisionCoefficient:1, "fixed":true}]);
	
	var bottom = controller.addElement(
			["name", "wall"],
			["image",
				 {
					width:10,
					height:500,
					top:0, 
					left:0,
					draw: drawWall,
					scaleY: 700/500
				 }
			],
			["position", {x:0, y:495, angle:-Math.PI/2}],
			["solid",{collisionCoefficient:1, "fixed":true}]);
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