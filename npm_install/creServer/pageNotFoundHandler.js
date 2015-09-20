var responseHandler = require("./responseHandler");

var handle = function (request, response) {
	responseHandler.sendError404(response);
	console.log('pageNotFoundHandler is handling the request');
};	

module.exports = handle;
