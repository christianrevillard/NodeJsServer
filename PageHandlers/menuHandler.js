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
	'<tr><td><a href="/files/WebApps/test.html">Client script test</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/testSuite.html">Client script test</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/testPerformance.html">Drawing perf test</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/jsevents.html">Events test</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/chess.html">JS Chess</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/solarSystem.html">Solar system test</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/tictactoe.html">Tic Tac Toe</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/testCollision.html">Test Collisions</a></td></tr>'+
	'<tr><td><a href="/files/WebApps/flipper.html">Flipper</a></td></tr>'+
	'<tr><td><a href="/files/html/TestSocket.html">Websocket Chat</a></td></tr>'+
	'</table'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

exports.handle = handle;
