var responseHandler = require('./responseHandler');
var server = require('../server');

var knownContentTypes = [
  { extension: ".css", contentType: 'text/css' },
  { extension: ".htm", contentType: 'text/html' },
  { extension: ".html", contentType: 'text/html' },
  { extension: ".jpg", contentType: 'image/jpg' },
  { extension: ".js", contentType: 'text/javascript' },
  { extension: ".json", contentType: 'application/json' },
  { extension: ".ogg", contentType: 'audio/ogg' },
  { extension: ".png", contentType: 'image/png' },
  { extension: ".svg", contentType: 'image/svg+xml' }];

var getContentType = function (fileName) {
  fileName = fileName.toLowerCase();
  var contentType = 'text/html';
  knownContentTypes.forEach(function (knownContentType) {
    if (fileName.slice(fileName.length - knownContentType.extension.length) === knownContentType.extension) { 
      contentType = knownContentType.contentType;
    }
  })
  return contentType;
};

var getHandler = function (path) {
  return function (request, response, next) {
    
    var url = require('url');
    
    var fileName = path || url.parse(request.url).pathname;
    
    var contentType = getContentType(fileName);
    
    console.log("clientFileHandler is handling '" + fileName + "', contentType '" + contentType + "'");
    
    responseHandler.sendFile(response, server.applicationRoot + '/' + fileName, contentType, next);
  };
};

module.exports = getHandler;

  