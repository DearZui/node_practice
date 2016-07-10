var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('Server listening on port 3000');

//index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'movie 首页',
		movies: [
		{
			title: '谍影重重',
			_id: 1,
			poster: 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1597183981.jpg'
		},
		{
			title: '谍影重重',
			_id: 2,
			poster: 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1597183981.jpg'
		},
		{
			title: '谍影重重',
			_id: 3,
			poster: 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1597183981.jpg'
		},
		{
			title: '谍影重重',
			_id: 4,
			poster: 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1597183981.jpg'
		},
		{
			title: '谍影重重',
			_id: 5,
			poster: 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1597183981.jpg'
		},
		{
			title: '谍影重重',
			_id: 6,
			poster: 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1597183981.jpg'
		}
		]
	})
})

//detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: 'movie 详情页',
		movie: {
			doctor: '道格·里曼',
			country: '美国',
			title: '谍影重重',
			year: '2002',
			poster: 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1597183981.jpg',
			language: '英语',
			flash: 'http://static1.mtime.cn/static/flash/newvideoplayer.swf?vid=60951&mid=223143&autoplay=1&w=1000&h=563',
			summary: '杰森·伯恩（马特·达蒙 饰）在意大利被人从海上救起，他失去了记忆，除了臀部的瑞士银行帐号之外，他完全没有办法证明自己的身份。杰森从瑞士银行找到了大量的现金，六本护照，一把枪，同时他发现自己格斗、枪械、和语言等方面的能力，他开始追查自己的身份，并且把陌生女子玛丽（弗兰卡·泼坦特 饰）也卷了进来。两人从瑞士到巴黎，一路上受到神秘杀手组织的追杀，危机重重。杰森能否化险为夷，找到自己的真实身份？他是否有勇气面对真相？'
		}
	})
})

//admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'movie 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})

//list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'movie 列表页',
		movies: [
		{
			title: '谍影重重',
			_id: 1,
			doctor: '道格·里曼',
			country: '美国',
			year: '2002',
			language: '英语',
			flash: 'http://static1.mtime.cn/static/flash/newvideoplayer.swf?vid=60951&mid=223143&autoplay=1&w=1000&h=563',
		}]
	})
})