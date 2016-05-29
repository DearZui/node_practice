var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);

console.log('movie started on port' + port);

//index page
app.get('/', function (req, res) {
    res.render('index', {
        title: 'movieMe 首页'
    })
});

//detail page
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: 'movieMe 详情'
    })
});

//admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'movieMe 后台录入'
    })
});

//list page
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: 'movieMe 后台列表'
    })
});