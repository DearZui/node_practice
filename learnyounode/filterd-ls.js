const fs = require('fs');
const path = require('path');

let extname = process.argv[3];

fs.readdir(process.argv[2], (err, files) => {
	let newArr = files.filter((value) => {
		return path.extname(value) === '.' + extname;
	});
	newArr.map((value) => {
		console.log(value);
	})
})