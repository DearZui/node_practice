exports.name = 'john';
exports.data = 'this is data';

var privateVariable = 5;

exports.getPrivate = function() {
	return privateVariable;
}