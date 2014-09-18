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
		
		//console.log("Resource file handler was called for '" + fileName + "', contentType '" + contentType + "'");	
	
		var pathLocation = fileName.slice(0, fileName.indexOf('/',1));
		
		if (fileLocations[pathLocation]===undefined)
		{
			console.log("Unknown location '" + pathLocation + "', for filename '" + fileName + "'");							
			fileNotFound.showNotFound(response);
			return;
		}

		//console.log("Found defined location '" + pathLocation + "' in filename '" + fileName + "'");	
			
		fileName = fileName.replace(new RegExp("^" + pathLocation), fileLocations[pathLocation]);
	
		//console.log("Disk filename is '" + fileName + "'");	
	
//		response.sendFile(fileName);

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
					fileNotFound.showNotFound(response);
				}			
			});
	};

exports.handle = handle;
