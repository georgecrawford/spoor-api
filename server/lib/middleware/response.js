
var EventEmitter	= require('events').EventEmitter;
var Event			= require('../../models/event');
var sinks			= require('../../sinks');

const emitter = new EventEmitter();
const gif = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

// Things listening to the 'request' event
/*
emitter.on('request', sinks.stdout); 
emitter.on('request', sinks.s3); 
emitter.on('request', sinks.kinesis); 
emitter.on('request', sinks.sqs); 
*/

// HTTP response 
module.exports = function(req, res, next) {

	// FIXME test - assign the querystring data to the body (as a buffer?)
	// FIXME test - must be incoming as urlencoded

	if (req.method === 'GET' && req.query.data) { 
		req.body = new Buffer(req.query.data);
	}

	//emitter.emit('request', new Event(req));

	// FIXME think about application/json responses
	res.setHeader('Cache-Control', 'no-cache, max-age=0');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	
	if (req.method === 'GET') { 
		res.setHeader('Content-Type', 'image/gif');
		res.send(gif);
	} else {
		res.setHeader('Content-Type', 'application/json');
		res.json({ 'status': 'ok' });
	}

	next();
}
