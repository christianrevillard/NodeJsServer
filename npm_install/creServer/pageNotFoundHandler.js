var responseHandler = require("./responseHandler");

var handle = function (request, response) {
    
  var url = require('url');
  
  var fileName = url.parse(request.url).pathname;
  console.log('pageNotFoundHandler is handling the request for ' + fileName);
    
  responseHandler.sendError404(response);
};	

module.exports = handle;
