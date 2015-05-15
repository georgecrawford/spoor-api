
var http 	= require('http');
var AWS		= require('aws-sdk'); 
var url		= require('url');
var qs		= require('querystring');
var uuid	= require('node-uuid');
var moment 	= require('moment');

const gif	= new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
const PORT	= process.env.PORT || 5101; 

AWS.config.update({
	accessKeyId: process.env.accessKey, 
	secretAccessKey: process.env.secretAccessKey, 
	"region": "eu-west-1"
});

var s3 = new AWS.S3(); 
var kinesis = new AWS.Kinesis();

// http response 
function px(req, res){
	// FIXME content-type header
	res.end(gif);
}

var server = http.createServer(px);

server.on('request', function (request, socket, head) {
	
	var q = qs.parse(url.parse(request.url).query);
	var key = moment().format('YYYY/MM/DD/HH') + uuid.v4();

	console.log('writing key: ', key);

	// write to s3
	s3.putObject({
		Bucket: 'ngda', Key: key, Body: JSON.stringify(q.data)
	}, function(err, data) {
		console.log(err, data);
	});
})


// flush the data to kinesis asynchronously to the request response
server.on('request', function (request, socket, head) {
	
	var q = qs.parse(url.parse(request.url).query);
	console.log('writing key to spoor');

	// write to kinesis
	kinesis.putRecord({
		StreamName: 'spoor-ingest', PartitionKey: "event", Data: JSON.stringify(q.data || new Date())
	}, function(err, data) {
		console.log(err, data);
	});
})

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
