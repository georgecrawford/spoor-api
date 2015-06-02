
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

	//console.log('EMAIL', req.url, req.method, path.test(req.url));

	if (req.method === 'GET' && !path.test(req.url)) return;
	statsd.increment('request.px', 1);

	if (isAnonymous(req)) {
		statsd.increment('response.anonymous', 1);
	} else {
		statsd.increment('response.registered', 1);
	}
	
	var guid = uuid();
	req.headers['x-anon'] = guid;	// FIXME override if found in the client

	res.setHeader('X-Anon', guid);
	res.setHeader('Content-Type', 'image/gif');
	res.setHeader('Cache-Control', 'no-cache, max-age=0');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');

	if (req.method === 'POST') {
		rawBody(req, { 'encoding': 'utf8' }, function (err, buffer) {		// FIXME cache errors
			emitter.emit('request', new Event(req));
		})
	} else {
		emitter.emit('request', new Event(req));
		res.end(gif);
	}

	return true;

}
