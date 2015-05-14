
var http 	= require('http');
var event 	= require('events').EventEmitter;
var AWS		= require('aws-sdk'); 
var url		= require('url');
var qs		= require('querystring');
var uuid	= require('node-uuid');
var moment  	= require('moment');

const gif	= new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
const PORT	= process.env.PORT || 5101; 

AWS.config.update({
	accessKeyId: process.env.accessKey, 
	secretAccessKey: process.env.secretAccessKey, 
	"region": "eu-west-1"
});

var s3 = new AWS.S3(); 

function px(req, res){
	res.end(gif);
}

var server = http.createServer(px);

// flush the data to s3
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

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
