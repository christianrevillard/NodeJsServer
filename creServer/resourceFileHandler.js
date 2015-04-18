var responseHandler = require('./responseHandler');

var getHandler = function(clientFileLocations, contentType) 
{
	return {
		handle:function(request, response, next){
			
			var url = require('url');

			var fileName = url.parse(request.url).pathname;
			
			console.log("Resource file handler was called for '" + fileName + "', contentType '" + contentType + "'");	
		
			var folders = fileName.split('/');

			var isClient = false;

      folders.forEach(function (current) {
				if (clientFileLocations.indexOf(current)>-1) {
					isClient = true;
				}
			});
	
			if (!isClient) {
				console.log(fileName + ' is not in a path authorized for file downloading');
				next();
				return;
			}
					
			responseHandler.sendFile(response, global.appRoot + '/' + fileName, contentType, next);
		}
	};	
};

var getAliasHtmlHandler = function (fileName) {
    return {
        handle: function (request, response, next) {
            responseHandler.sendFile(response, global.appRoot + '/' + fileName, 'text/html', next);
        }
    };
};

exports.getHandler = getHandler;
exports.getAliasHtmlHandler = getAliasHtmlHandler;
