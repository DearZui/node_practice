'use strick';

var http = require('http'),
	https = require('https'),
	fs = require('fs'),
	path = require('path'),
	cheerio = require('cheerio');

var opt = {
	hostname: 'movie.douban.com',
	path: '/top250',
	port: 80
};

function spiderMovie (index) {
	https.get('https://movie.douban.com/top250?start=' + index, function (res) {
		var pageSize = 25;
		var html = '';
		var movies = [];
		res.setEncoding('utf-8');

		res.on('data', function (chunk) {
			html += chunk;
		});
		res.on('end', function () {
			var $ = cheerio.load(html);

			$('.item').each(function () {
				var picUrl = $('.pic img', this).attr('src');
				var movie = {
					title: $('.title', this).text(),
					star: $('.info .star .rating_num', this).text(),
					link: $('a',this).attr('href'),
					picUrl: picUrl
				};
				if (movie) {
					movies.push(movie);
				}
				downloadImg('../img/', movie.picUrl);
			});
			saveData('./data' + (index / pageSize) + '.json', movies);
		});
	}).on('error', function (err) {
		console.log(err);
	})
}

function downloadImg(imgDir, url) {
	https.get(url, function (res) {
		var data = '';
		res.setEncoding('binary');
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function () {
			fs.writeFile(imgDir + path.basename(url), data, 'binary', function (err) {
				if (err) {
					return console.log(err);
				}
				console.log('Image downloaded: ', path.basename(url));
			});
		});
	}).on('error', function (err) {
		console.log(err);
	});
}

function saveData(path, movies) {
	console.log(movies);
	fs.writeFile(path, JSON.stringify(movies, null, ' '), function (err) {
		if (err) {
			return console.log(err);
		}
		console.log('Data saved');
	});
}

function* doSpider(x) {
	var start = 0;
	console.log(start + ' ----------------------');
	while (start < x) {
		yield start;
		spiderMovie(start);
		start += 25;
	}
}

for (var x of doSpider(250)) {
	console.log(x);
}