function 
	route(
		allowedFileLocations,
		fileHandlers, 
		pageHandlers, 
		pathname, 
		response, 
		request) {
	
	var extension;

	if (typeof pageHandlers[pathname] === 'function') {
		console.log("Found filehandler for pathname " + pathname);
		pageHandlers[pathname](response, request);
		return;
	} 
	
	extension = pathname.slice(pathname.lastIndexOf('.'));

	if (typeof fileHandlers[extension] === 'function')
	{
		if (
			allowedFileLocations.some(
				function(allowedFileLocation)
				{
					return pathname.slice(0,allowedFileLocation.length) === allowedFileLocation; 
				}))
		{
			console.log("Found filehandler for extension " + extension);
			fileHandlers[extension](response, request);
			return;
		}
	}

	console.log("No request handler found for " + pathname);
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("File not found.")
	response.end();
	return;
}

exports.route = route;
