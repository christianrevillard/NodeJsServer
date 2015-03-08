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
			
			if (contentType == "content/html")
			{
				console.log("Transforming a content html, adding headers");	
				response.writeHead(200, {"Content-Type":  "text/html"});
				// TODO extract/refactor heres...
								
				var transform = require('stream').Transform;
				
				var masterPageBuilder = new transform({ });

				var masterPageStream = fs.createReadStream("./resources/html/masterPage.html");
				masterPageStream.setEncoding('utf8');
				var masterPage = ''
				masterPageStream.on('data',function(buffer){
				  masterPage += buffer;
				});

				var intro;
				var outro;

				var doneIntro = false;
				var introOK = false;

				masterPageStream.on('end',function(){
					intro = masterPage.slice(0, masterPage.indexOf("{{Content}}"));
					outro = masterPage.slice(masterPage.indexOf("{{Content}}")+11);
					introOK = true;
				});

				var doTransform  =function(obj, chunk, encoding, callback){
					if (!introOK)
					{
						setTimeout(function(){doTransform(obj, chunk, encoding, callback);}, 10);
						return;
					}
					if (!doneIntro)
					{
						doneIntro = true;
						obj.push(intro);
					}
					obj.push(chunk); // no transform. 
					callback();
				};
				
				masterPageBuilder._transform = function(chunk, encoding, callback){
					doTransform(this, chunk, encoding, callback);
				};
				
				masterPageBuilder._flush = function(callback){
					response.write(outro);
					callback();
				};

				fs.createReadStream(fileName).pipe(masterPageBuilder).pipe(response);					
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
