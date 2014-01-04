var http = require('http');
var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('JustSaying enters the world... \n');
}).listen(port);
console.log('Server running at ' + host + ':' + port);
