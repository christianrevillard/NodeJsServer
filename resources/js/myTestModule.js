var myTestModule =
{
	helloWorld: function(){ alert ("Hello World!"); },	

	ajaxTest: function(message)
	{		
		this.getResponse(
			"../../testAjax?q=" + message,
			'',
			function(response) //callback
			{
				document.getElementById('ajaxResponse').innerHTML = response.toString();
			});
	},
	
	getResponse: function(url, message, callback)
	{
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function()
		{
			if (request.readyState === 4 && request.status === 200)
			{
				callback(request.responseText);
			}
		};
		
		request
			.open(
				"GET",
				url);
		request
			.setRequestHeader(
				"Content-Type",
				"text/plain;charset=UTF-8");
		
		request.send(message);			
	}
};
