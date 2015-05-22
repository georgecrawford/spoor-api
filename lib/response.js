
var uuid		= require('node-uuid');
var statsd		= require('../lib/statsd');

const gif		= new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

var isAnonymous = function (request) { 
	var hasSession = /ftsession/i;
	return (request.headers && !hasSession.test(request.headers['cookie']))
}

// HTTP response 
module.exports = function(req, res){

	if (isAnonymous(req)) {
		statsd.increment('response.anonymous', 1);
		res.setHeader('X-Anon', uuid());	// FIX set an actual cookie
	} else {
		statsd.increment('response.registered', 1);
	}

	res.setHeader('Content-Type', 'image/gif');
	res.setHeader('Cache-Control', 'no-cache, max-age=0');
	res.end(gif);

}
