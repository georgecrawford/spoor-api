
var AWS				= require('aws-sdk'); 
var moment			= require('moment');
var uuid			= require('node-uuid');

AWS.config.update({
	accessKeyId: process.env.accessKey, 
	secretAccessKey: process.env.secretAccessKey, 
	"region": "eu-west-1"
});

var sqs = new AWS.SQS();
var sqsUrl = process.env.SQS_URL;

module.exports = function (message) {
	
	console.log('Writing message to SQS');

	sqs.sendMessage({
		QueueUrl: sqsUrl, MessageBody: message.toString()
	}, function(err, data) {
		console.log(err, data);
	});
};
