var server = require("./ServerCore/server");
var router = require("./ServerCore/router");

var uploadStartHandler = require("./PageHandlers/upload/startHandler");
var uploadShowHandler = require("./PageHandlers/upload/showHandler");
var uploadHandler = require("./PageHandlers/upload/uploadHandler");
var menuHandler = require("./PageHandlers/menuHandler");

var handlers = {};
handlers["/"] = menuHandler.handle;
handlers["/upload"] = uploadStartHandler.handle;
handlers["/upload/start"] = uploadStartHandler.handle;
handlers["/upload/doupload"] = uploadHandler.handle;
handlers["/upload/show"] = uploadShowHandler.handle;

server.start(router.route, handlers);
