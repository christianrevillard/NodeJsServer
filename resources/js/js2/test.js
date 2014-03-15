var Test = Test || {};

Test.onload = function ()
{		
	var canvas = document.getElementById('theCanvas');

	var controller = new CreJs.Creanvas.Creanvas({
		canvas: canvas,
		noWorker: false
	});
	
	canvas.addEventListener ("click", function(e)
	{
		controller.handleClick(e);
	}); 	
};
