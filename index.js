var server = require("./ServerCore/server");

var handlers = [];

///////////////////////////
/* File extensions */
///////////////////////////
var fileLocations = {};
fileLocations['/files'] = './resources';
fileLocations['/temp'] = '/tmp';

var fileHandler = require("./FileHandlers/FileHandler");
handlers.push(["*.js", new fileHandler.FileHandler(fileLocations,'text/javascript')]);
handlers.push(["*.css", new fileHandler.FileHandler(fileLocations,'text/css')]);
handlers.push(["*.png", new fileHandler.FileHandler(fileLocations,'image/png')]);
handlers.push(["*.gif", new fileHandler.FileHandler(fileLocations,'image/gif')]);
handlers.push(["*.html", new fileHandler.FileHandler(fileLocations,'text/html')]);
handlers.push(["*.htm", new fileHandler.FileHandler(fileLocations,'text/html')]);
handlers.push(["*.ogg", new fileHandler.FileHandler(fileLocations,'audio/ogg')]);

///////////////////////////
/* Routes */
///////////////////////////

/* menu */
handlers.push(["/", require("./PageHandlers/menuHandler")]);

/* image upload */
handlers.push(["/upload", handlers["/upload/start"] = require("./PageHandlers/upload/startHandler")]);
handlers.push(["/upload/upload", require("./PageHandlers/upload/uploadHandler")]);
//handlers.push(["/chat", require("./PageHandlers/chatHandler").handle, 'chat']);

/* ajax requests */
handlers.push(["/testAjax", require("./RequestHandlers/testAjax")]);

handlers.push(["/socket/*", require("./WebSockets/connectSocket")]);

server.start(handlers);
