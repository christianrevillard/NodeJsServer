var resourceFileHandler = require("./resourceFileHandler");

var FileHandler = function(contentType) {
	this.handle = function(response, request){
		return resourceFileHandler.handle(
		response, 
		request,		
		contentType);
	};
};

exports.FileHandler= FileHandler;
