function route(handlers, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if (typeof handlers[pathname] === 'function') {
		handlers[pathname](response, request);
	} 
	else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		return "404 Not found";
	}
}

exports.route = route;
