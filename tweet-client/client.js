var http = require('http')
	,qs = require('querystring');

function send (theName) {
	http.request({
		host: '127.0.0.1'
		,port: '3000'
		,url: '/'
		,method: 'POST'
	},funtion(res) {
		res.setEncoding('utf8');
		res.on('end', funtion() {
			console.log('\n  \033[90m  require complete!\033[39m');
			process.stdout.write('\n  your name: ');
		});
	}).end(qs.stringify({ name: theName }));
}

process.stdout.write('\n  your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(name) {
	send(name.replace('\n', ''));
});