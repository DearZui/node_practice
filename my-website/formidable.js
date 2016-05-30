var connect = require('connect');

var server = connect(
    connect.bodyParser(),
    connect.static('static')
);

server.use(function (req, res, next) {
    if('POST' == req.method) {
        console.log(req.body.file);
    } else {
        next();
    }
});

server.listen(3000);