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
				content: $('')
			}
		})
	})
}