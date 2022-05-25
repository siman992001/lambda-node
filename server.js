var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
    console.log('url:', req.url);
    var q = url.parse(req.url, true).query;
    console.log('query:', q.name);
    fs.readFile('server.js', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data);
        return res.end();
    })
}).listen(4500);


