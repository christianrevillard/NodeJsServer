var fs = require("fs");

var handle = 
	function(
		response,
		request, 
		fileLocations,
		contentType) 
	{
		var fileName, url, router;
			
		url = require('url');
		fileNotFound =  require('../ServerCore/fileNotFound');		
		fileName = url.parse(request.url).pathname;
		
		console.logMessage("Resource file handler was called for '" + fileName + "', contentType '" + contentType + "'");	
	
		var pathLocation = fileName.slice(0, fileName.indexOf('/',1));
		
		if (fileLocations[pathLocation]===undefined)
		{
			console.logMessage("Unknown location '" + pathLocation + "', for filename '" + fileName + "'");							
			fileNotFound.showNotFound(response);
			return;
		}

		console.logMessage("Found defined location '" + pathLocation + "' in filename '" + fileName + "'");	
			
		fileName = fileName.replace(new RegExp("^" + pathLocation), fileLocations[pathLocation]);
	
		console.logMessage("Disk filename is '" + fileName + "'");	
	
		fs.exists(
			fileName, 
			function (exists) 
			{
				if (exists)
				{
					console.logMessage("Serving '" + fileName + "'");	
					response.writeHead(200, {"Content-Type":  contentType});
					fs.createReadStream(fileName).pipe(response);					
				}
				else
				{
					console.logMessage("File not found '" + fileName + "'");	
					fileNotFound.showNotFound(response);
				}			
			});
	};

exports.handle = handle;
