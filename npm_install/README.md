# Version 1.0.0 :
Changes in path handling. No more /files as default
All files under a /Client/ directory can be downloaded. This can be changed by sending an array of authorized directoried to addDefaultHandlers
global.appRoot stores the site root, different default values when running on OpenShift (/ is site root) and local Visual Studio (/ is C:/ on local disc). 
global.appRoot is the directory containing the default script (index.js)
Expected:
*root*/Lib/Client/html/commonHeader.html to have header elements common to all html pages (emulating master page)
Connection to socket
/socket/*actualHandler* (/socket/Apps/MySocketApp/Socket.js is establishing a socket connection through *root*/Apps/MySocketApp/Socket.js)

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

// define custom handlers here, as addDefaultHandlers defines the fallback handler on /*
    
// define file type and location for usual extensions (hmtl, js, json, images...)
handlers = server.addDefaultHandlers(  
  handlers,                     
  '/Lib/Client/html/menu.html' // start page
  ['Client'] // this is the default, can be omitted
);

server.server.start(
  require('path').resolve(__dirname), // root 
  handlers);
#############

#############
Custom resources
#############
- alias : www.myserver.com/myPage returns ./myPageDir/mypage.html
handlers.push(["/myPage", resourceFileHandler.getAliasHtmlHandler('./MyApplicationDir1/mypage.html')]);

- custom handlers
handler: /applicationHandlers/myPageHandler.js 
Handler must define this function: handle(request, response) 
in index.js: handlers.push(["/myCustomPage", require("./MyApplicationDir2/myPageHandler.js")]);

- socket connections:
Handler: /MyApplicationDir3/socketName.js
Handler must define this function: startApplication(socketName) 
connect to  /socket/MyApplicationDir3/socketName.js

