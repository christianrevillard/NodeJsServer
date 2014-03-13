var Test = Test || {};

Test.onload = function ()
{		
	alert('onload');
	
	var canvas = document.getElementById('theCanvas');

	var controller = new Testcontroller(canvas);

	if (!window.Worker)
		alert("no worker for you!");
		
	var worker = new window.Worker("js/workerTest.js");
	
	alert(worker);
	
	canvas.addEventListener ("click", function(e)
	{
		worker.postMessage({clientX: e.clientX, clientY:e.clientY});
	}); 

	worker.onmessage = function(e)
	{
		alert(e.data.xy);
	};
	// proxy stuff test
	
};

var Testcontroller = function()
{
};