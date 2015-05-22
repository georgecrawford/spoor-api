
var http			= require('http');
var EventEmitter	= require('events').EventEmitter;
var Event			= require('./models/event');
var sinks			= require('./sinks');
var statsd			= require('./lib/statsd');
var response		= require('./lib/response');

require('./lib/metrics/sqsAttributes');
require('./lib/metrics/cloudwatch');

const PORT		= process.env.PORT || 5101; 
const emitter	= new EventEmitter();

var server = http.createServer(response);

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
