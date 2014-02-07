var server = require("./ServerCore/server");
var router = require("./ServerCore/router");

///////////////////////////
/* File extensions */
///////////////////////////
var fileHandlers = {};
var fileHandler = require("./FileHandlers/fileHandler");
fileHandlers[".js"] = new fileHandler.FileHandler('text/javascript').handle;
fileHandlers[".png"] = new fileHandler.FileHandler('image/png').handle;
fileHandlers[".gif"] = new fileHandler.FileHandler('image/gif').handle;
fileHandlers[".html"] = fileHandlers[".htm"] = new fileHandler.FileHandler('text/html').handle;
allowedFileLocations = 
	['/tmp/',		 
	 '/resources/'];

///////////////////////////
/* Routes */
///////////////////////////
var pageHandlers = {};

/* menu */
var menuHandler = require("./PageHandlers/menuHandler");
pageHandlers["/"] = menuHandler.handle;

/* image upload */
var uploadStartHandler = require("./PageHandlers/upload/startHandler");
var uploadHandler = require("./PageHandlers/upload/uploadHandler");
pageHandlers["/upload"] = pageHandlers["/upload/start"] = uploadStartHandler.handle;
pageHandlers["/upload/upload"] = uploadHandler.handle;

server.start(	
		router.route, 
		allowedFileLocations,
		fileHandlers,
		pageHandlers);