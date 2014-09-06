var fs = require("fs"),
formidable = require("formidable");

function handle(response, request) 
{
	var form;
	
	console.logMessage("Request handler 'upload' was called.");
	
	form = new formidable.IncomingForm();
	console.logMessage("about to parse");
	form
		.parse(
			request, 
			function(
				error, 
				fields, 
				files) 
			{
				console.logMessage("parsing done");
			
				/* Possible error on Windows systems:
				tried to rename to an already existing file */
				fs.rename(
					files.upload.path, 
					"/tmp/test.png", 
					function(error) 
					{
						if (error) 
						{
							fs.unlink("/tmp/test.png");
							fs.rename(files.upload.path, "/tmp/test.png");
						}
					});
		
				response.writeHead(200, {"Content-Type": "text/html"});
				response.write("received image:<br/>");
				response.write("<img src='/temp/test.png' />"); 
				response.end();
			});
}

exports.handle = handle;