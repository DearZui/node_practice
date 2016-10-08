const fs = require('fs');

let path = process.argv[2];

const callback = (err, data) => {
	console.log(data.toString().split('\n').length - 1);
}

fs.readFile(path, callback);