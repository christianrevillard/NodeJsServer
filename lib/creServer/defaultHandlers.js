var resourceFileHandler = require("./resourceFileHandler");

// authorized folders

var addDefaultHandlers = function (handlers, startPage, clientFileLocations) {
  handlers = handlers || [];
  clientFileLocations = clientFileLocations || ['Client'];
    
  /* resource files */
  handlers.push(["*.js", resourceFileHandler.getHandler(clientFileLocations, 'text/javascript')]);
  handlers.push(["*.json", resourceFileHandler.getHandler(clientFileLocations, 'application/json')]);
  handlers.push(["*.css", resourceFileHandler.getHandler(clientFileLocations, 'text/css')]);
  handlers.push(["*.png", resourceFileHandler.getHandler(clientFileLocations, 'image/png')]);
  handlers.push(["*.gif", resourceFileHandler.getHandler(clientFileLocations, 'image/gif')]);
  handlers.push(["*.jpg", resourceFileHandler.getHandler(clientFileLocations, 'image/jpg')]);
  handlers.push(["*.svg", resourceFileHandler.getHandler(clientFileLocations, 'image/svg+xml')]);
  handlers.push(["*.html", resourceFileHandler.getHandler(clientFileLocations, 'text/html')]);
  handlers.push(["*.htm", resourceFileHandler.getHandler(clientFileLocations, 'text/html')]);
  handlers.push(["*.ogg", resourceFileHandler.getHandler(clientFileLocations, 'audio/ogg')]);
  
  /* default page */
  if (startPage) {
    handlers.push(["/", resourceFileHandler.getAliasHtmlHandler(startPage)]);
  }
  
  /* Web socket connections */
  handlers.push(["/socket/*", require("./connectSocket")]);
  
  /* fallback */
  handlers.push(["/*", require("./pageNotFoundHandler")]);
  
  return handlers;
};

exports.addDefaultHandlers = addDefaultHandlers;