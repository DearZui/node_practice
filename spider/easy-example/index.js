var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var seg_url = 'http://bbs.hupu.com/topic-';

function filter_html(html) {
	//html = iconv.decode(new Buffer(html, 'binary'))
	var $ = cheerio.load(html);
	var questions = $('#pl');
	var questionDatas = [];
	questions.each(function (item) {
		var summary = $(this);
		var question =summary.find('tbody>tr>td.p_title>a');
		var questionData = {
			title: question.text(),
			code: question.attr('href').split('/')[1].split('.html')[0]
		};
		questionDatas.push(questionData);
	});
	questionDatas.forEach(function (item) {
		console.log('title: ' + item.title + ' code: ' + item.code);
	});
}

var i = 2;

http.get(seg_url+i, function (res) {
	var html = '';
	res.on('data', function(data) {
		html += data;
	});
	res.on('end', function() {
		filter_html(html);
	});
}).on('error', function (e) {
	console.log('Error: ' + e.message);
});