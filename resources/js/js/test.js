var Test = Test || {};

Test.onload = function ()
{		
	var canvas = document.getElementById('theCanvas');

	var controller = new Testcontroller(canvas);

	if (!Worker)
		alert("no worker for you!");
		
	var worker = new Worker("js/workerTest.js");
	
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