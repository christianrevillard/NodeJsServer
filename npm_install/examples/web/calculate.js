var handle = function (request, response) {
  var url = require('url');
  var x = parseInt(url.parse(request.url, true).query.x);
  var y = parseInt(url.parse(request.url, true).query.y);
  
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ sum: x + y }));
  response.end();
};

module.exports = handle;
