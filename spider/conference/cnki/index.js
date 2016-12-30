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

var value;

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
				confUrl.m_url = url_handler(confUrl.m_url);
				var url_arr = getDetailUrls(confUrl.m_url);
				getDetails(confUrl, "Mcontent", url_arr[0], "infoLabel");
				//confUrl.Msource = getDetails(url_arr[2], "callLabel");
				//confUrl.Mimportant_time = getDetails(url_arr[1], "DateLabel");
				//confUrl.Mhistory = getDetails(url_arr[5], "historyLabel");
				if(confUrl) {
					s_confs.push(confUrl);
				}
			});
			saveData('./data/' + date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + '.json', s_confs);
		});
	}).on('error', (err) => {
		console.log(err);
	})
}

function saveData(path, confs) {
	fs.writeFile(path, JSON.stringify(confs, null, ' '), (err)=>{
		if (err) {
			return console.log(err);
		}
		console.log('Data saved');
	});
}

function url_handler(str) {
	return "http://conf.cnki.net/" + str;
}

function getDetailUrls(url) {
	let id = url.split("=")[1];
	let url_arr = [];
	url_arr[0] = url;
	url_arr[1] = "http://conf.cnki.net/WebSite/ImportDate.aspx?conferenceID=" + id;
	url_arr[2] = "http://conf.cnki.net/WebSite/callForConference.aspx?conferenceID=" + id;
	url_arr[3] = "http://conf.cnki.net/WebSite/VenueHotelTraffic.aspx?conferenceID=" + id;
	url_arr[4] = "";
	url_arr[5] = "http://conf.cnki.net/WebSite/HistoryConference.aspx" + id;
	return url_arr;
}

// function getDetails(obj, attr, url, contentId) {
// 	http.get(url, function(res) {
// 		let html = '';
// 		let data = '';
// 		res.setEncoding('utf-8');
// 		res.on('data', function (chunk) {
// 			html += chunk;
// 			let $ = cheerio.load(html);
// 			data = $('#' + contentId).text();
// 		});
// 		res.on('end', ()=> {
// 			obj[attr] = data;
// 			console.log(obj[attr]);
// 		});
// 	}).on('error', (err) => {
// 		console.log(err);
// 	});
// }

spiderConf();
