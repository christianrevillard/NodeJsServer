var fs = require("fs");

var sendFile = function(response, fileName, contentType, next) {
	fs.exists(
		fileName, 
		function (exists) 
		{
			if (exists)
			{
				console.log("Serving '" + fileName + "'");	
				response.writeHead(200, {"Content-Type":  contentType});
				fs.createReadStream(fileName).pipe(response);					
			}
			else
			{
				console.log("File not found '" + fileName + "'");	
							next();
				
//				sendError404(response);
			}			
		});
};

var	sendError404 = function (response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("No file for you!.")
	response.end();				
};

exports.sendFile = sendFile;
exports.sendError404 = sendError404;

