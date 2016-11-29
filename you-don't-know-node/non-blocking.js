const fs = require('fs');

fs.readFile('accounts.txt', 'utf-8', function(error, contents) {
	console.log(contents);
});

console.log('Hello Ruby\n');

fs.readFile('ips.txt', 'utf-8', function(error, contents) {
	console.log(contents);
});

console.log('Hello Node!')