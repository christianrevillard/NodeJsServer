var	handle = 
	function (request, response)
	{
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("No file for you!.")
		response.end();				
	}

exports.handle = handle;
