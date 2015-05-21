
var http			= require('http');
var EventEmitter	= require('events').EventEmitter;
var Event			= require('./models/event');
var sinks			= require('./sinks');
var statsd			= require('./lib/statsd');

require('./lib/metrics/sqsAttributes');
require('./lib/metrics/cloudwatch');

const gif		= new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
const PORT		= process.env.PORT || 5101; 
const emitter	= new EventEmitter();

// HTTP response 
function px(req, res){
	res.setHeader('Content-Type', 'image/gif');
	res.setHeader('Cache-Control', 'no-cache, max-age=0');
	res.end(gif);
}

var server = http.createServer(px);

// Create an 'event' from the incoming HTTP request
server.on('request', function (request, socket, head) {

	if (request.url !== '/px.gif') return;

	statsd.increment('request.px', 1);

	var event = new Event({});
	event.envelope('headers', request.headers);
	emitter.emit('request', event);
});

// Thing listening to the 'request' event
emitter.on('request', sinks.stdout); 
emitter.on('request', sinks.s3); 
emitter.on('request', sinks.kinesis); 
emitter.on('request', sinks.sqs); 

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
