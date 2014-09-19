var server = require("./ServerCore/server");

var handlers = [];

///////////////////////////
/* File extensions */
///////////////////////////
var fileLocations = {};
fileLocations['/files'] = './resources';
fileLocations['/temp'] = '/tmp';

//var fileHandler = require("./PageHandlers/FileHandler");
/*handlers.push(["*.js", new fileHandler.FileHandler(fileLocations,'text/javascript')]);
handlers.push(["*.css", new fileHandler.FileHandler(fileLocations,'text/css')]);
handlers.push(["*.png", new fileHandler.FileHandler(fileLocations,'image/png')]);
handlers.push(["*.gif", new fileHandler.FileHandler(fileLocations,'image/gif')]);
handlers.push(["*.html", new fileHandler.FileHandler(fileLocations,'text/html')]);
handlers.push(["*.htm", new fileHandler.FileHandler(fileLocations,'text/html')]);
handlers.push(["*.ogg", new fileHandler.FileHandler(fileLocations,'audio/ogg')]);*/
var resourceFileHandler = require("./PageHandlers/resourceFileHandler");
handlers.push(["*.js", resourceFileHandler.getFileHandler(fileLocations,'text/javascript')]);
handlers.push(["*.css", resourceFileHandler.getFileHandler(fileLocations,'text/css')]);
handlers.push(["*.png", resourceFileHandler.getFileHandler(fileLocations,'image/png')]);
handlers.push(["*.gif", resourceFileHandler.getFileHandler(fileLocations,'image/gif')]);
handlers.push(["*.html", resourceFileHandler.getFileHandler(fileLocations,'text/html')]);
handlers.push(["*.htm", resourceFileHandler.getFileHandler(fileLocations,'text/html')]);
handlers.push(["*.ogg", resourceFileHandler.getFileHandler(fileLocations,'audio/ogg')]);

///////////////////////////
/* Routes */
///////////////////////////

/* menu */
handlers.push(["/", require("./PageHandlers/menuHandler")]);

/* image upload */
handlers.push(["/upload", require("./PageHandlers/upload/startHandler")]);
handlers.push(["/upload/start", require("./PageHandlers/upload/startHandler")]);
handlers.push(["/upload/upload", require("./PageHandlers/upload/uploadHandler")]);

/* ajax requests */
handlers.push(["/testAjax", require("./RequestHandlers/testAjax")]);

/* socket connections */
handlers.push(["/socket/*", require("./WebSockets/connectSocket")]);

/* fallback */
handlers.push(["/*", require("./PageHandlers/PageNotFoundHandler")]);

server.start(handlers);
