var http = require("http");
var url = require("url");

function start(route, handle) {
function onRequest(request, response) {
 var pathname = url.parse(request.url).pathname;
 console.log("Request for " + pathname + " received.");
 route(handle, pathname, response, request);
};
	http.createServer(onRequest).listen(
		process.env.OPENSHIFT_NODEJS_PORT || 8888, 
		process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
	console.log("Server has started.");}

exports.start = start;