var server = require('../server');

var normalizeName = function (socketName) {
  if (!socketName || socketName.slice(0, 1) != '/')
    socketName = '/' + socketName;

  return socketName;
}

var socket = function (socketName) {
  socketName = normalizeName(socketName);
  
  var existing = server.io.nsps[socketName]
  
  if (existing) {
    return existing;
  };
  
  console.log('Setting up a new socket: ' + socketName);
    
  var socketHandler = null;
  try {
    socketHandler = require(server.applicationRoot + socketName);
  }
  catch (e) { }
  
  var socket = server.io.of(socketName);
  socket.on("connection", socketHandler || function (socket) { console.log( socket.id + ' is connected to ' + socketName); })     
  
  return socket;
}

exports.socket = socket;
