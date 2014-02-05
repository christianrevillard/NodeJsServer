function route(fileHandlers, pageHandlers, pathname, response, request) {
	var extension, isResourceFile;
	
	isResourceFile = 
		// server resource files
		pathname.slice(0,11) === "/resources/"  ||
		// temp files
		pathname.slice(0,5) === "/tmp/" 

		extension = pathname.slice(pathname.lastIndexOf('.'));

	if (isResourceFile && typeof fileHandlers[extension] === 'object') {
		console.log("Found resource filehandler for extension " + extension);
		(fileHandlers[extension].handler)(response, request, fileHandlers[extension].contentType);
	} 
	else if (typeof fileHandlers[extension] === 'function') {
		console.log("Found filehandler for extension " + extension);
		fileHandlers[extension](response, request);
	} 
	else if (typeof pageHandlers[pathname] === 'function') {
		console.log("Found filehandler for pathname " + pathname);
		pageHandlers[pathname](response, request);
	} 
	else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		return "404 Not found";
	}
}

exports.route = route;
