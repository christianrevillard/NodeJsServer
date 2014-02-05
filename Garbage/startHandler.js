/*
// use resource file handler instead

function handle(response, request) {
	console.log("Request handler 'clientScript' was called.");

	var fileName, queryString, url;
	
	queryString = require('querystring');
	url = require('url');
	
	fileName = queryString.parse(url.parse(request.url).query).fileName;
	
	if (fileName === undefined)
	{
	    response.writeHeader(200, {"Content-Type": "text/html"});  
	    response.write('No file request in ' + request.url);  
	    response.end(); 		
	    return;
	}
	
	console.log("Requesting include file '" + './resources/clientscript/' + fileName + "'.");

	var fs = require('fs');
	
	fs
		.readFile(
			'./resources/clientscript/' + fileName, 
			function (err, html) {
				if (err) {
					throw err; 
				}       
	        response.writeHeader(200, {"Content-Type": "text/html"});  
	        response.write(html);  
	        response.end(); });
}

exports.handle = handle;
*/