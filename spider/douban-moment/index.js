'use strict';

const http = require('http'),
	  https = require('https'),
	  fs = require('fs'),
	  path = require('path'),
	  cheerio = require('cheerio');

var opt = {
	hostname: 'moment.douban.com/',
	path: './post',
	port: 80
};

function spiderContent(index) {
	https.get('https://moment.douban.com/post/' + index, function (res) {
		let html = '';
		var articles = [];
		res.setEncoding('utf-8');

		res.on('data', function (chunk) {
			html += chunk;
		});

		res.on('end', function () {
			var $ = cheerio.load(html);
			const article = {
				title: $('#title', this).text(),
				content: $('#id', this).html(),
				picUrl: $('.content_img img', this).attr('src')
			};
			if (article) {
				articles.push(movie);
			}

			downloadImg('../img/' + index + '/', article.picUrl);
			saveData('./data' + index + '.json', articles);
		});
	}).on('error', function() {
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
} ﻿​

function* doSpider(x) {
	var start = 141502;
	console.log(start + '--------------------------');
	
}