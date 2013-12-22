var server = require("./server");
var router = require("./router");
var startHandler = require("./startHandler");
var showHandler = require("./showHandler");
var uploadHandler = require("./uploadHandler");

var handlers = {};
handlers["/"] = startHandler.handle;
handlers["/start"] = startHandler.handle;
handlers["/upload"] = uploadHandler.handle;
handlers["/show"] = showHandler.handle;

server.start(router.route, handlers);
