const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      cheerio = require('cheerio');

const opt = {
  hostname: 'csp.escience.cn',
  path: '/dct/page/65537/__rpcsp0x2Main!65537%7C0_action/queryByStatus/__rpcsp0x2Main!65537%7C0_pageSize/100/__rpcsp0x2Main!65537%7C0_status/published/__rpcsp0x2Main!65537%7C0_pageNo/1?',
  port: 80
};

try {
	http.get('http://csp.escience.cn/dct/page/65537/__rpcsp0x2Main!65537%7C0_action/queryByStatus/__rpcsp0x2Main!65537%7C0_pageSize/100/__rpcsp0x2Main!65537%7C0_status/published/__rpcsp0x2Main!65537%7C0_pageNo/' + "1", function(res) {
    var html = '';
    var s_confs = [];
		var date = new Date();
		res.setEncoding('utf-8');

		res.on('data', function (chunk) {
			html += chunk;
		});

    res.on('end', () => {
      var $ = cheerio.load(html);
      var x = $("#confList>div[style$='10px;']");
      x.map((e) => {
        var confUrl = {
          m_title: x.eq(e).children("span").children("a").text(),
          m_url: x.eq(e).children("span").children("a").attr("href"),
          m_location: x.eq(e).children("span").children("i").eq(1).text(),
          m_time: x.eq(e).children("span").children("i").eq(0).text()
        };
        if(confUrl) {
          s_confs.push(confUrl);
        }
        console.log(s_confs);
        //console.err("Can't reach url:http://csp.escience.cn/dct/page/65537/__rpcsp0x2Main!65537%7C0_action/queryByStatus/__rpcsp0x2Main!65537%7C0_pageSize/100/__rpcsp0x2Main!65537%7C0_status/published/__rpcsp0x2Main!65537%7C0_pageNo/1.")
      })
    })
  })
} catch (e) {
	console.error(e.message);
	console.log("Refetching in 10 minutes")
}