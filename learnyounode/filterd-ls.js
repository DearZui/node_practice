var fs = require('fs');
var path = require('path');

var post = process.argv[3];

fs.readdir(process.argv[2], function(err, list) {
	var newArr = list.filter(function(value) {
		return path.extname(value) === ('.' + post);
	});
	newArr.map(function (item) {
		console.log(item);
	})
})