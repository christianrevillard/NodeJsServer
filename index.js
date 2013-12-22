var server = require("./ServerCore/server");
var router = require("./ServerCore/router");

var startHandler = require("./PageHandlers/startHandler");
var showHandler = require("./PageHandlers/showHandler");
var uploadHandler = require("./PageHandlers/uploadHandler");

var handlers = {};
handlers["/"] = startHandler.handle;
handlers["/start"] = startHandler.handle;
handlers["/upload"] = uploadHandler.handle;
handlers["/show"] = showHandler.handle;

server.start(router.route, handlers);
