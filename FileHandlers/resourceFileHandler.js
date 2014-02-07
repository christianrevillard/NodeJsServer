var fs = require("fs");

var handle = function(response, request, contentType) {
	var fileName,url;
		
	url = require('url');
	fileName = url.parse(request.url).pathname;
	
	console.log("Generic file handler was called for '" + fileName + "', ContentType is '" + contentType + "'");	

	if (fileName.slice(0,5) != "/tmp/")
	{
		fileName = "." + fileName;
	}

	response.writeHead(200, {"Content-Type":  contentType});
	fs.createReadStream(fileName).pipe(response);
}

exports.handle = handle;
