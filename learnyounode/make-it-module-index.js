/*var fileFn = require('./make-it-module-module.js');
var dir = process.argv[2];
var ext = process.argv[3];

fileFn(dir, ext, function(err, list) {
	if(err) console.log("err:" + err);

	list.map(function (item) {
		console.log(item);
	})
})*/

const fileFn = require('./make-it-module-module.js');
let dir = process.argv[2];
let ext = process.argv[3];

fileFn(dir, ext, (err, list) => {
	if(err) console.log("err:" + err);

	list.map((item) => {
		console.log(item);
	})
})