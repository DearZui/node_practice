var fs = require('fs');

var bf = fs.readFileSync(process.argv[2].toString());
var str = bf.toString();
var arr = str.split('\n');

console.log(arr.length - 1);