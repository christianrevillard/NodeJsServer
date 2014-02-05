var server = require("./ServerCore/server");
var router = require("./ServerCore/router");

var pageHandlers = {};
var uploadStartHandler = require("./PageHandlers/upload/startHandler");
var uploadShowHandler = require("./PageHandlers/upload/showHandler");
var uploadHandler = require("./PageHandlers/upload/uploadHandler");
var menuHandler = require("./PageHandlers/menuHandler");

pageHandlers["/"] = menuHandler.handle;
pageHandlers["/upload"] = pageHandlers["/upload/start"] = uploadStartHandler.handle;
pageHandlers["/upload/upload"] = uploadHandler.handle;
pageHandlers["/upload/show"] = uploadShowHandler.handle;

var fileHandlers = {};
var resourceFileHandler = require("./FileHandlers/resourceFileHandler");
fileHandlers[".js"] = { handler:resourceFileHandler.handle, contentType:'text/javascript'};
fileHandlers[".png"] = { handler:resourceFileHandler.handle,  contentType:'image/png'};
fileHandlers[".gif"] = { handler:resourceFileHandler.handle,  contentType:'image/gif'};
fileHandlers[".html"] = fileHandlers[".htm"] = { handler:resourceFileHandler.handle,  contentType:'text/html'};

server.start(
		router.route, 
		fileHandlers,
		pageHandlers);