var http = require('http')

http.createServer(function(req, res){
    console.log(req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(4500);


