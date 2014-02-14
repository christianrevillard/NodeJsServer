var server = require("./ServerCore/server");
var router = require("./ServerCore/router");

///////////////////////////
/* File extensions */
///////////////////////////
var fileLocations = {};
fileLocations['/files'] = './resources';
fileLocations['/temp'] = '/tmp';

var handlers = {};
var fileHandler = require("./FileHandlers/FileHandler");
handlers[".js"] = new fileHandler.FileHandler(fileLocations,'text/javascript').handle;
handlers[".png"] = new fileHandler.FileHandler(fileLocations,'image/png').handle;
handlers[".gif"] = new fileHandler.FileHandler(fileLocations,'image/gif').handle;
handlers[".html"] = handlers[".htm"] = new fileHandler.FileHandler(fileLocations,'text/html').handle;
handlers[".ogg"] = new fileHandler.FileHandler(fileLocations,'audio/ogg').handle;

///////////////////////////
/* Routes */
///////////////////////////

/* menu */
var menuHandler = require("./PageHandlers/menuHandler");
handlers["/"] = menuHandler.handle;

/* image upload */
var uploadStartHandler = require("./PageHandlers/upload/startHandler");
var uploadHandler = require("./PageHandlers/upload/uploadHandler");
handlers["/upload"] = handlers["/upload/start"] = uploadStartHandler.handle;
handlers["/upload/upload"] = uploadHandler.handle;

/* ajax requests */
var testAjaxHandler = require("./RequestHandlers/testAjax");
handlers["/testAjax"] = testAjaxHandler.handle;


server
	.start(	
		router.route, 
		fileLocations,
		handlers);