const fs = require('fs');
const path = require('path');

module.exports = function (dir, ext, callback) {
	fs.readdir(dir, function (err, list) {
		if(err) return callback(err);

	 	list = list.filter(function(value) {
			return path.extname(value) === ('.' + ext);
		})

		callback(null, list)
	 })
}