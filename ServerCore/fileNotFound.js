var	showNotFound = 
	function (response)
	{
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("No file for you!.")
		response.end();				
	}

exports.showNotFound = showNotFound;
