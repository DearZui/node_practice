console.log(1);
process.nextTick(function() {
	console.log(3);
});
console.log(2);
console.log(4);
console.log(4);
console.log(4);
console.log(4);
console.log(4);
console.log(4);
console.log(4);
console.log(4);