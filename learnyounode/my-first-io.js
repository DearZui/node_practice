const fs = require('fs');

const path = process.argv[2];
const buffer = fs.readFileSync(path);
const str = buffer.toString();

console.log(str.split('\n').length - 1);