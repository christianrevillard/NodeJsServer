var CreTictactoe = CreTictactoe || {};

CreTictactoe.onload = function ()
{		
	var theCanvas = document.getElementById('theCanvas');
	
	var controller = new Creanvas.Controller(
			{
				canvas:theCanvas, 
				drawBackground : 
					function (context) 
					{
						context.strokeStyle = "#000";

						context.fillStyle = "#666";
						context.fillRect(0,0,700,500);

						context.fillStyle = "#DDD";
						context.fillRect(25,25,450,450);
						context.fillRect(525,75,150,150);
						context.fillRect(525,250,150,150);
						
						context.moveTo(25+150,25);
						context.lineTo(25+150,25+450);
						context.moveTo(25+300,25);
						context.lineTo(25+300,25+450);
						context.moveTo(25,25+150);
						context.lineTo(25+450,25+150);
						context.moveTo(25,25+300);
						context.lineTo(25+450,25+300);
						context.lineWidth=4;
						context.lineCap='round';
						context.stroke();
						
					},		
			});
	
	var markX= new Creanvas.Element(
			{
			controller: controller,
			x: 600,
			y: 150,
			duplicable: true,
			draw: function (context) 
			{
				context.strokeStyle = "#f00";
				context.lineCap='round';
				context.lineWidth=8;
				context.moveTo(this.x-50,this.y-50);
				context.lineTo(this.x+50,this.y+50);
				context.moveTo(this.x-50,this.y+50);
				context.lineTo(this.x+50,this.y-50);
				context.stroke();
				context.arc(this.x,this.y,50,0,2*Math.PI);
			}});

	var markO = new Creanvas.Element(
			{
				controller: controller,
			x: 600,
			y: 325,
			duplicable: true,
			draw: function (context) 
			{
				context.strokeStyle = "#0f0";
				context.lineWidth=8;
				context.arc(this.x,this.y,50,0,2*Math.PI);
				context.stroke();
			}});
	
	// prevent a Galaxy bug stuff - can we do better ? must handle scrolling manually...
	function touchHandlerDummy(e)
	{
	    e.preventDefault();
	    return false;
	}
	document.addEventListener("touchstart", touchHandlerDummy, false);
	document.addEventListener("touchmove", touchHandlerDummy, false);
	document.addEventListener("touchend", touchHandlerDummy, false);

};