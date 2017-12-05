var http = require('http');
var fs = new require("fs");
var s = http.createServer();
s.on('request', function(request, response) {
    response.writeHead(200);
    console.log(request.method);
    console.log(request.headers);
    console.log(request.url);
    console.log('ip: ${request.ip}');
    response.write(fs.readFileSync("h.html", "utf8"));
    response.end();
});
 
s.listen(8888);
console.log('Browse to http://127.0.0.1:8888');