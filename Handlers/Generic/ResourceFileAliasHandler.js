var responseHandler = require('../../ServerCore/ResponseHandler');

var getHtml = function(fileName) 
{
	return {
		handle:function(request, response, next){					
			responseHandler.sendFile(response, fileName, 'text/html', next); 
		}
	};	
};	

var getContentHtml = function(fileName) 
{
	return {
		handle:function(request, response, next){					
			responseHandler.sendFile(response, fileName, 'content/html', next); 
		}
	};	
};	

exports.getHtml = getHtml;
exports.getContentHtml = getContentHtml;
