var resourceFileHandler = require("./resourceFileHandler");

// authorized folders

var addDefaultHandlers = function (root, handlers, startPage, clientFileLocations) {
  handlers = handlers || [];
  clientFileLocations = clientFileLocations || ['Client'];
    
  /* resource files */
  handlers.push(["*.js", resourceFileHandler.getHandler(root, clientFileLocations, 'text/javascript')]);
  handlers.push(["*.json", resourceFileHandler.getHandler(root, clientFileLocations, 'application/json')]);
  handlers.push(["*.css", resourceFileHandler.getHandler(root, clientFileLocations, 'text/css')]);
  handlers.push(["*.png", resourceFileHandler.getHandler(root, clientFileLocations, 'image/png')]);
  handlers.push(["*.gif", resourceFileHandler.getHandler(root, clientFileLocations, 'image/gif')]);
  handlers.push(["*.jpg", resourceFileHandler.getHandler(root, clientFileLocations, 'image/jpg')]);
  handlers.push(["*.svg", resourceFileHandler.getHandler(root, clientFileLocations, 'image/svg+xml')]);
  handlers.push(["*.html", resourceFileHandler.getHandler(root, clientFileLocations, 'text/html')]);
  handlers.push(["*.htm", resourceFileHandler.getHandler(root, clientFileLocations, 'text/html')]);
  handlers.push(["*.ogg", resourceFileHandler.getHandler(root, clientFileLocations, 'audio/ogg')]);
  
  /* default page */
  if (startPage) {
    handlers.push(["/", resourceFileHandler.getAliasHtmlHandler(root + '/' + startPage)]);
  }
  
  /* Web socket connections */
  handlers.push(["/socket/*", require("./connectSocket").getHandler(root)]);
  
  /* fallback */
  handlers.push(["/*", require("./pageNotFoundHandler")]);
  
  return handlers;
};

exports.addDefaultHandlers = addDefaultHandlers;