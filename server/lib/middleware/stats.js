
var statsd = require('../../lib/statsd');

const hasSession = /ftsession/i;

var isAnonymous = function (request) { 
	return (request.headers && !hasSession.test(request.headers['cookie']))
}

module.exports = function(req, res, next) {

	var key = (isAnonymous(req)) ? 'response.anonymous' : 'response.registered';
	
	statsd.increment(key, 1);
	statsd.increment('request.px', 1);
	
	next();
}
