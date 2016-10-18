const bl = require('bl');
const http = require('http');

http.get(process.argv[2], function (res) {
	res.pipe(bl(function (err, data) {
		console.log(data.length);
		console.log(data.toString());
	}))
})