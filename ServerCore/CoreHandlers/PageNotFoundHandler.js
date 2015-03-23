var responseHandler = require("../../ServerCore/ResponseHandler");

var handle = function (request,response) {
	responseHandler.sendError404(response);
	console.log('Done 404 page');
};	

exports.handle = handle;
