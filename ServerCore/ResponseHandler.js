var fs = require("fs");

var sendFile = function(response, fileName, contentType, next) {
	fs.exists(
		fileName, 
		function (exists) 
		{
			if (!exists)
			{
				console.log(fileName + ' does not exist');	
				next();
			}
			
//			console.log("Serving '" + fileName + "' '" + contentType + "'");	
			
			if (contentType == "text/html")
			{
				//console.log("Transforming a html, adding common header");	
				response.writeHead(200, {"Content-Type":  "text/html"});
								
				var transform2 = require('stream').Transform;
				
				var builder = new transform2({ });

				var stream = fs.createReadStream("./ClientFiles/common/html/commonHeader.html");
				stream.setEncoding('utf8');
				var commonHeader = ''
				stream.on('data',function(buffer){
					commonHeader += buffer;
				});

				var doneHeader = false;
				var commonHeaderOK = false;

				stream.on('end',function(){
					commonHeaderOK = true;
				});

				var doTransform  =function(obj, chunk, encoding, callback){
					if (!commonHeaderOK)
					{
						// should be cached in some way...
						setTimeout(function(){doTransform(obj, chunk, encoding, callback);}, 10);
						return;
					}
					if (!doneHeader)
					{

						var chunkString = chunk.toString();
						var headStart = chunkString.indexOf("<head>");
						if (headStart>-1){
							
							//console.log("Found <head> tag in " + chunkString);	
							var beforeInsert = chunkString.slice(0, headStart + 6);
							var afterInsert = chunkString.slice(headStart + 7);
							chunk = beforeInsert + commonHeader + afterInsert;
							//console.log("Chunk updated to  " + chunk);	
							doneHeader = true;
						}
					}
					obj.push(chunk); // no transform. 
					callback();
				};
				
				builder._transform = function(chunk, encoding, callback){
					doTransform(this, chunk, encoding, callback);
				};
				
				fs.createReadStream(fileName).pipe(builder).pipe(response);					
			}
			else
			{
				response.writeHead(200, {"Content-Type":  contentType});
				fs.createReadStream(fileName).pipe(response);					
			}
		});
};

var	sendError404 = function (response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("No file for you!.")
	response.end();				
};

exports.sendFile = sendFile;
exports.sendError404 = sendError404;
