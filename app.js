var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {

    //if the endpoint is '/' pipe back the html file.
    if (req.url === '/'){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        //we use streams here to increase performance.
        //otherwise if we store the contents of index.htm to a variable and pass it back
        // it would increase the buffer size. Since res is a writable stream, we can pipe in a readable stream to save memory.
        fs.createReadStream(__dirname + '/index.htm').pipe(res);
    }

    //if the endpoint is localhost:1337/api return data.
    else if (req.url === '/api'){
        res.writeHead(200, {'Content-Type' : 'application/json'});
        var obj = {
            firstname: 'John',
            lastname: 'Doe'
        };
        res.end(JSON.stringify(obj));
    }

    else {
        res.writeHead(404);
        res.end();
    }

}).listen(1337, '127.0.0.1');