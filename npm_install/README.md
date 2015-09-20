1/ describe how I want it to be - and remember what the problem was with setting up a single socket- communicating with the rest of the application
2/ make it this way


## Example

### Main node file (index.js) 

  var server = require('cre-nodejs-server');

  server.startPage = 



  var handlers = [];  // these are routes in fact..

  // html handler, simply serving the page - by creating a shorter alias
  // http://myserver/upload will return the same as http://myserver/Client/html/uploadImage.html
  handlers.push(["/upload", server.htmlHandler('./upload/Client/html/uploadImage.html')]);

  // custom handler. the handler must implement  handle(request, response)  
  handlers.push(["/upload/upload", require("./upload/Server/UploadHandler")]);
  
  handlers = server.addDefaultHandlers(  
    handlers,                     
    '/Lib/Client/html/menu.html'
  );

  server.server.start(
    require('path').resolve(__dirname), // root catavlog
    handlers);





















var server = require('cre-nodejs-server');
var handlers = [];

///////////////////////////
/* Routes */
///////////////////////////

/* pages */
handlers.push(["/upload", server.fileHandler.getAliasHtmlHandler('./upload/Client/html/uploadImage.html')]);
handlers.push(["/upload/start", server.fileHandler.getAliasHtmlHandler('./upload/Client/html/uploadImage.html')]);
handlers.push(["/upload/upload", require("./upload/Server/UploadHandler")]);
handlers.push(["/tictactoe", server.fileHandler.getAliasHtmlHandler('./TicTacToeOnline/Client/html/tictactoeClient.html')]);
handlers.push(["/collision", server.fileHandler.getAliasHtmlHandler('./CollisionsOnline/Client/html/collisionClient.html')]);
//handlers.push(["/mongodb/insert", require("./ApplicationHandlers/mongodb/MongoDbInsertHandler")]);
//handlers.push(["/mongodb/read", require("./ApplicationHandlers/mongodb/MongoDbReadHandler")]);
//handlers.push(["/mongodb/delete", require("./ApplicationHandlers/mongodb/MongoDbDeleteHandler")]);
//handlers.push(["/mongodb/update", require("./ApplicationHandlers/mongodb/MongoDbUpdateHandler")]);

/* ajax requests */
handlers.push(["/testAjax", require("./ajaxTest/Server/TestAjaxHandler")]);

/* default, incl. files, socket, 404 */
handlers = server.addDefaultHandlers(  
  handlers,                     
  '/Lib/Client/html/menu.html'
);

server.server.start(
  require('path').resolve(__dirname), // root 
  handlers);  


















simple http server

Dependencies express, socket.io

Default pages handlers:

http://mySite/Client/* : files authorized for downloading. 'Client' is the default value, this can be overriden in   addDefaultHandlers.

handlers: array of page handlers, defining the routing for the server
=> make it an object instead.


http://mySite/socket/dirs/mysocket : handles a socket connection. socket handler placed at application_root/dirs/mysocket


socketHandler: startApplication: something a bit more ?










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
||
- socket connections:
Handler: /MyApplicationDir3/socketName.js
Handler must define this function: startApplication(socketName) 
connect to  /socket/MyApplicationDir3/socketName.js

