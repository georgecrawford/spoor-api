
var uuid			= require('node-uuid');
var rawBody			= require('raw-body');
var EventEmitter	= require('events').EventEmitter;

var Event			= require('../models/event');
var sinks			= require('../sinks');
var statsd			= require('../lib/statsd');

const emitter = new EventEmitter();
const gif = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
const path = /^\/px\.gif$/i;		// pathname ~ /px.gif/system/event

var isAnonymous = function (request) { 
	var hasSession = /ftsession/i;
	return (request.headers && !hasSession.test(request.headers['cookie']))
}

// Thing listening to the 'request' event
emitter.on('request', sinks.stdout); 
emitter.on('request', sinks.s3); 
emitter.on('request', sinks.kinesis); 
emitter.on('request', sinks.sqs); 

// HTTP response 
module.exports = function(req, res){

	if (!path.test(req.url)) return;
	statsd.increment('request.px', 1);

	if (isAnonymous(req)) {
		statsd.increment('response.anonymous', 1);
		res.setHeader('X-Anon', uuid());	// FIXME set an actual cookie
	} else {
		statsd.increment('response.registered', 1);
	}
	
	res.setHeader('Content-Type', 'image/gif');
	res.setHeader('Cache-Control', 'no-cache, max-age=0');

	if (req.method === 'POST') {
		rawBody(req, {
			limit: '50kb'	// SQS/Kinesis both have limits on message size, so keep this low
		}, function (err, buffer) {		// FIXME cache errors
			req.payload = buffer;
			emitter.emit('request', new Event(req));
			res.end(gif);
		})
	} else {
		emitter.emit('request', new Event(req));
		res.end(gif);
	}

	return true;

}
