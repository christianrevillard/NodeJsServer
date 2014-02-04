function handle(response, request) {
	console.log("Request handler 'start' was called.");

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" '+
	'content="text/html; charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="upload" method="post" enctype="multipart/form-data">'+
	'<input type="file" name="upload" mutiple="multiple">'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

exports.handle = handle;
