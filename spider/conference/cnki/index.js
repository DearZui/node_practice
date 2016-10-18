'use strict';

const http = require('http'),
	  fs = require('fs'),
	  path = require('path'),
	  cheerio = require('cheerio');

const opt = {
	hostname: 'conf.cnki.net',
	path: '/index.aspx',
	port: 80
};

function spiderConf () {
	http.get('http://conf.cnki.net/index.aspx', function (res) {
		var html = '';
		var s_confs = [];
		var date = new Date();
		res.setEncoding('utf-8');

		res.on('data', function (chunk) {
			html += chunk;
		});
		res.on('end', ()=> {
			var $ = cheerio.load(html);
			var x = $('#recommendLabel .ht_tab .ht_tab_bg01');
			$('#recommendLabel .ht_tab .ht_tab_bg01').map((e)=> {
				var confUrl = {
					m_url : x.eq(e).children("td").eq(0).children("a").attr("href"),
					m_title: x.eq(e).children("td").eq(0).children("a").text(),
					m_location : x.eq(e).children("td").eq(1).text(),
					m_time : x.eq(e).children("td").eq(2).text(),
					m_unit : x.eq(e).children("td").eq(3).text()
				};
				if(confUrl) {
					s_confs.push(confUrl);
					console.log(confUrl);
				}
			});
			saveData('./data' + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + '.json', s_confs);
		});
	}).on('error', (err) => {
		console.log(err);
	})
}

function saveData(path, confs) {
	console.log(confs);
	fs.writeFile(path, JSON.stringify(confs, null, ' '), (err)=>{
		if (err) {
			return console.log(err);
		}
		console.log('Data saved');
	});
}

spiderConf();