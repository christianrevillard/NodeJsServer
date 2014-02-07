var fs = require("fs"),
formidable = require("formidable");

function handle(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(
		request, 
		function(error, fields, files) {
			console.log("parsing done");
			
			/* Possible error on Windows systems:
			tried to rename to an already existing file */
			fs.rename(
				files.upload.path, 
				"/tmp/test.png", 
				function(error) {
					if (error) {
						fs.unlink("/tmp/test.png");
						fs.rename(files.upload.path, "/tmp/test.png");
					}
				});
		
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("received image:<br/>");
			response.write("<img src='/tmp/test.png' />"); 
			response.end();
		}
	);
}

exports.handle = handle;