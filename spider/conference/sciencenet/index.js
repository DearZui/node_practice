'use strict';

const http = require('http'),
	  fs = require('fs'),
	  path = require('path'),
	  cheerio = require('cheerio');

//MongoDB
const MongoClient = require('mongodb').MongoClient,
			assert = require('assert');
const url = 'mongodb://localhost:27017/sciencenet';

const opt = {
	hostname: 'meeting.sciencenet.cn/',
	path: '/index.php',
	port: 80
};

function spiderConf (index) {
	http.get('http://meeting.sciencenet.cn/index.php?s=%2FCategory%2Fallmt&allid=1&p=' + index, function (res) {
		var html = '';
		var s_confs = [];
		var date = new Date();
		res.setEncoding('utf-8');

		res.on('data', function (chunk) {
			html += chunk;
		});
		res.on('end', ()=> {
			var $ = cheerio.load(html);
			var x = $('.content680').eq(1).children("table").first().children("tbody").children("tr");
			x.map((e)=>{
				if(e === 0) return;
				var confUrl = {
					m_title: x.eq(e).children("td").eq(1).children("a").text().split("\t").pop().split("  ").shift(),
					m_url : x.eq(e).children("td").eq(1).children("a").attr("href"),
					m_location: x.eq(e).children("td").eq(3).children("span").text().split("\t").pop().split("  ").shift(),
					m_time: x.eq(e).children("td").eq(5).text().split(" ").join("").split("\n")[1],
				};
				if(confUrl) {
					s_confs.push(confUrl);
				}
			});
			console.log(s_confs);
			MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				console.log("Connected correctly to database.");

				//Insert
				db.collection('documents').insertMany(s_confs, function(err, r) {
					assert.equal(null, err);

					db.close();
				});
			});
			//saveData('./data/data' + date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "-" + index +'.json', s_confs);
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

function* doSpider(x) {
	var start = 1;
	while(start < x) {
		yield start;
		spiderConf(start);
		start ++;
	}
}

for (var x of doSpider(10)) {
	console.log(x);
}
