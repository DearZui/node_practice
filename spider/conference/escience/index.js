const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      cheerio = require('cheerio');

const opt = {
  hostname: 'csp.escience.cn',
  path: '/dct/page/65537/__rpcsp0x2Main!65537%7C0_action/queryByStatus/__rpcsp0x2Main!65537%7C0_pageSize/100/__rpcsp0x2Main!65537%7C0_status/published/__rpcsp0x2Main!65537%7C0_pageNo/1?',
  port: 80
};

function doSpider(index) {
  http.get('http://csp.escience.cn/dct/page/65537/__rpcsp0x2Main!65537%7C0_action/queryByStatus/__rpcsp0x2Main!65537%7C0_pageSize/100/__rpcsp0x2Main!65537%7C0_status/published/__rpcsp0x2Main!65537%7C0_pageNo/' + index, function(res) {
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
        console.log(e);
      })
    })
  })
}

doSpider(1);
