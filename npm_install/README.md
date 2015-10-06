# cre-nodejs-server

Simple web server, based on express and socket.io.

# example index.js

```
var server = require('cre-nodejs-server');

server.start({
  rootDirectory: require('path').resolve(__dirname), 
  routes: [
    { route: '/myPage', handler: server.clientFileHandler('./Client/myPage.html') },
    { route: '/myCustomHandlerPage', handler: require('./customHandler') }, 
    { route: '/myOwnClientDir/*', handler: clientFileHandler() }, 
  ]
  sockets:['socketPath1', 'socketPath1']
  pageHeader: 'html/header.html'
});
```

# parameters for start method:

## port

## rootDirectory

Where we will be lookig for files. Can often use require('path').resolve(__dirname) to use the same dir as index.js runs in.

## tempFolder

Directory used for routes starting with /temp/, typically a writable location, for file upload. Default is C:/tmp

## routes

Array of route objects. For each term:
* route: string defining the route, use * as wildcard
* handler: must be a function(request, response)

## sockets

List of socket paths that will be initialized at server start. This makes sure the socket is created before any client tries to connect. This is not necessary if we expect the server to start sending before any client connects.

## pageHeader

File that will be included in the head section of all html files.

## contentTypes
Mapping between file extensions and content-types, in case something is missing in the default list.

# Standard route handlers

## clientFileHandler()

```
{ route: '/myOwnClientDir/*', handler: clientFileHandler() }
```
All files under myOwnClientDir will be handled as client/content files and downloaded.

## clientFileHandler(filePath)

```
{ route: '/myPage', handler: server.clientFileHandler('./Client/myPage.html') }
```
Defines an alias: http://server/myPage will be the same as http://server/Client/myPage.html

# Default handlers

These handlers are defined by default:

```
{ route: '*/Client/*', handler: clientFileHandler()}
{ route: '/temp/*', handler: clientFileHandler() }
{ route: '/', handler: clientFileHandler('./Client/index.html') }
{ route: '*', handler: require("./pageNotFoundHandler") }
```

Your own routes will come before those, except an override for "*", which will always be handled last, but before the default one.

# Sockets

Just call server.socket(socketPath) to get a socket.io socket. This creates the socket if it does not exists yet and returns it.

A custom handler for the socket can be defines by creating a module with the specified path. The module must return a function(socket), that is be called on socket connection.

# Events

server.events is an EventHandler.

serverSarted is fired when the start process is completed.

# Examples

See included examples for more information.
