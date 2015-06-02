
var AWS				= require('aws-sdk'); 
var moment			= require('moment');
var uuid			= require('node-uuid');
var statsd			= require('../lib/statsd');

AWS.config.update({
	accessKeyId: process.env.accessKey, 
	secretAccessKey: process.env.secretAccessKey, 
	"region": "eu-west-1"
});

var sqs = new AWS.SQS();
var sqsUrl = process.env.SQS_URL;

module.exports = function (message) {
	
	console.log('Writing message to SQS');
	statsd.increment('sqs.message.count', 1);

	sqs.sendMessage({
		QueueUrl: sqsUrl, MessageBody: message.toString()
	}, function(err, data) {
		if (err) {
			statsd.increment('sqs.message.error', 1);
		}
		else {
			statsd.increment('sqs.message.success', 1);
		}	
		console.log(err, data);
	});
};
