#!/bin/env node
/**
var server = require("./openShiftserver");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
**/
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
/**
server.start(router.route, handle);
**/
