var connect = require('connect');
var server = connect.createServer();

server.use(connect.static(__dirname + '/website'));
server.use(function (req, res, next) {
    console.error(' %s %s ', req.method, req.url);
    next();
});

server.use(function (req, res, next) {
    if ('GET' == req.method && '/images' == req.url.substr(0, 7)) {
        
    } else {
        next();
    }
    
});

server.use(function (req, res, next) {
    if('GET' == req.method && '/' == req.url) {
        
    } else {
        next();
    }
});

server.use(function (req, res, next) {
    res.writeHead(404);
    res.end('Not Found');
});

app.use(connect.logger('dev'));

server.listen(3000);