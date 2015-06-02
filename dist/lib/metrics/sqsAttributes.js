'use strict';

var AWS = require('aws-sdk');
var moment = require('moment');
var uuid = require('node-uuid');
var statsd = require('../statsd');

AWS.config.update({
	accessKeyId: process.env.accessKey,
	secretAccessKey: process.env.secretAccessKey,
	'region': 'eu-west-1'
});

var sqs = new AWS.SQS();
var sqsUrl = process.env.SQS_URL;

setInterval(function () {
	sqs.getQueueAttributes({
		QueueUrl: sqsUrl, AttributeNames: ['ApproximateNumberOfMessages', 'ApproximateNumberOfMessagesDelayed', 'ApproximateNumberOfMessagesNotVisible']
	}, function (err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else {
			console.log(data);
			statsd.increment('sqs.ApproximateNumberOfMessages', parseInt(data.Attributes.ApproximateNumberOfMessages));
			statsd.increment('sqs.ApproximateNumberOfMessagesDelayed', parseInt(data.Attributes.ApproximateNumberOfMessagesDelayed));
			statsd.increment('sqs.ApproximateNumberOfMessagesNotVisible', parseInt(data.Attributes.ApproximateNumberOfMessagesNotVisible));
		}
	});
}, 20000);