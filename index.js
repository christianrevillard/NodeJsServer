var server = require("./ServerCore/server");

var handlers = [];

///////////////////////////
/* File extensions */
///////////////////////////
var fileLocations = {};
fileLocations['/files'] = './resources';
fileLocations['/temp'] = '/tmp';

var fileHandler = require("./FileHandlers/FileHandler");
handlers.push(["*.js", new fileHandler.FileHandler(fileLocations,'text/javascript').handle]);
handlers.push(["*.css", new fileHandler.FileHandler(fileLocations,'text/css').handle]);
handlers.push(["*.png",new fileHandler.FileHandler(fileLocations,'image/png').handle]);
handlers.push(["*.gif",new fileHandler.FileHandler(fileLocations,'image/gif').handle]);
handlers.push(["*.html", new fileHandler.FileHandler(fileLocations,'text/html').handle]);
handlers.push(["*.htm", new fileHandler.FileHandler(fileLocations,'text/html').handle]);
handlers.push(["*.ogg", new fileHandler.FileHandler(fileLocations,'audio/ogg').handle]);

///////////////////////////
/* Routes */
///////////////////////////

/* menu */
handlers.push(["/", require("./PageHandlers/menuHandler").handle]);

/* image upload */
handlers.push(["/upload", handlers["/upload/start"] = require("./PageHandlers/upload/startHandler").handle]);
handlers.push(["/upload/upload", require("./PageHandlers/upload/uploadHandler").handle]);
handlers.push(["/chat", require("./PageHandlers/chatHandler").handle, 'chat']);

/* ajax requests */
handlers.push(["/testAjax", require("./RequestHandlers/testAjax").handle]);

server.start(handlers);
