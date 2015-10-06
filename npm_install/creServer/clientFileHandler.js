var responseHandler = require('./responseHandler');
var server = require('../server');
var defaultContentTypes = require('./contentTypes')

var getContentType = function (fileName) {
  var knownContentTypes = server.contentTypes || defaultContentTypes
  
  fileName = fileName.toLowerCase();  
  var contentType = 'text/html';

  knownContentTypes.forEach(function (knownContentType) {
    if (fileName.slice(fileName.length - knownContentType.extension.length) === knownContentType.extension) { 
      contentType = knownContentType.contentType;
    }
  })
  return contentType;
};

var getHandler = function (path, root) {
  return function (request, response, next) {
    
    var url = require('url');
    
    var fileName = path || url.parse(request.url).pathname;
    
    console.log("clientFileHandler is handling '" + fileName + "', contentType '" + contentType + "'");
    
    var fileName = fileName.slice(0, 6) === '/temp/' ? 
      server.tempFolder + fileName.slice(5) : 
      server.applicationRoot + '/' + fileName;

    var contentType = getContentType(fileName);
    
    console.log("clientFileHandler is handling '" + fileName + "', contentType '" + contentType + "'");
    
    responseHandler.sendFile(response, fileName, contentType, next);
  };
};

module.exports = getHandler;

  