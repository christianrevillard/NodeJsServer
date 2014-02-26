function handle(response, request) {
	console.log("Request handler 'menu' was called.");

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" '+
	'content="text/html; charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<table>'+	
	'<tr><td><a href="/upload">Upload image test</a></td></tr>'+
	'<tr><td><a href="/files/html/test.html">Client script test</a></td></tr>'+
	'<tr><td><a href="/files/html/jsevents.html">Events test</a></td></tr>'+
	'<tr><td><a href="/files/html/chess.html">JS Chess</a></td></tr>'+
	'<tr><td><a href="/files/html/canvas.html">Canvas tests</a></td></tr>'+
	'</table'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

exports.handle = handle;
