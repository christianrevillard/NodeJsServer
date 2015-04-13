# Version 0.0.2 :
Fixed error in socket realitive path  under npm-ization.

# Version 0.0.1 :
Update ReadMe with some basic info

# creNodeJsServer

Simple Node.js server on Express

Resource files serving

Support for WebSocket connection

#############
Example of index.js:
#############
var server = require('cre-nodejs-server');

var handlers = [];

var fileLocations = [];
// maps a path to a server location for resource files
fileLocations['/files'] = './clientFiles';
// maps a path to a local machine location for for example upload
fileLocations['/tmp'] = 'C:/temp';
// home page
fileLocations['startPage'] = './clientFiles/default.html';

// define custom handlers here, as addDefaultHandlers defines the fallback handler on /*
    
// define file type and location under /files for usual extensions (hmtl, js, json, images...)
handlers = server.addDefaultHandlers(fileLocations, handlers);

server.server.start(handlers);
#############

#############
Custom resources
#############
- alias : www.myserver.com/myPage returns ./myPageDir/mypage.html
handlers.push(["/myPage", resourceFileHandler.getAliasHtmlHandler('./myPageDir/mypage.html')]);

- custom handlers
handler: /applicationHandlers/myPageHandler.js 
It must define this function: handle(request, response) 
in index.js: handlers.push(["/myCustomPage", require("./applicationHandlers/myPageHandler.js")]);

- socket connections:
handler: /applicationHandlers/socketName.js
It must define this function: startApplication(socketName) 
connect to  www.myserver.com/socket/socketName.js

