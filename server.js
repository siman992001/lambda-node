var http = require('http');
var url = require('url');

http.createServer(function(req, res){
    console.log('url:', req.url);
    var q = url.parse(req.url, true).query;
    console.log('query:', q.name);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(4500);


