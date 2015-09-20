var fs = require("fs");
var headerTransform = require("./pageHeaderTransform");

var sendFile = function(response, fileName, contentType, next) {
	fs.exists(
		fileName, 
		function (exists) 
		{
			if (!exists)
			{
				console.log(fileName + ' does not exist');	
				next();
				return;
			}
						
			if (contentType == "text/html")
			{
				response.writeHead(200, {"Content-Type":  "text/html"});								
		
				fs
					.createReadStream(fileName)
					.pipe(headerTransform.getTransform())
					.pipe(response);					
			}
			else
			{
				response.writeHead(200, {"Content-Type":  contentType});
				fs.createReadStream(fileName).pipe(response);					
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
