var applyTo = function(element, customTimerData)
{	
	console.log('applying customTimer');
	
	setInterval(
		function()
		{
			customTimerData["action"].call(element);					
		},
		customTimerData["time"]);
}

exports.applyTo = applyTo;