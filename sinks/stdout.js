
var util = require('util');

module.exports = function (message) {
	console.log(util.inspect(message, { depth: 7 }));
};

