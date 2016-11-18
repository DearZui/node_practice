'use strict'

const http = require('http'),
	  fs = require('fs'),
	  path = require('path'),
	  cheerio = require('cheerio');

function getDetails(url) {
	http.get(url, function(res) {
		let html = '';
		let data = '';
		res.setEncoding('utf-8');
		res.on('data', function (chunk) {
			html += chunk;
		});
		res.on('end', ()=> {
			let $ = cheerio.load(html);
			data = $('#callLabel').text();
			console.log(data);
		})
	}).on('error', (err) => {
		console.log(err);
	})
}

getDetails('http://conf.cnki.net/WebSite/callForConference.aspx?conferenceID=b0e8380f-608c-4e93-ab23-abb2739b8936');