#!/bin/env node
var server = require("./openShiftserver");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
server.start(router.route, handle);

/**
	// This is working fine !
var server = require("./openShiftServer");
var http = require("http");

function onRequest(request, response) {
	 response.writeHead(200, {"Content-Type": "text/html"});
 response.write("coucou");
 response.end();
 };

http.createServer(onRequest).listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
**/