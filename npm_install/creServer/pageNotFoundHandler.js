var responseHandler = require("./responseHandler");

var handle = function (request,response) {
	responseHandler.sendError404(response);
	console.log('Done 404 page');
};	

exports.handle = handle;
