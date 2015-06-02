'use strict';

var AWS = require('aws-sdk');
var moment = require('moment');
var uuid = require('node-uuid');
var statsd = require('../lib/statsd');

AWS.config.update({
	accessKeyId: process.env.accessKey,
	secretAccessKey: process.env.secretAccessKey,
	'region': 'eu-west-1'
});

var s3 = new AWS.S3();

module.exports = function (message) {

	var key = moment().format('YYYY/MM/DD/HH') + uuid.v4();

	console.log('Writing message to S3', key);
	statsd.increment('s3.message.count', 1);

	// write to s3
	s3.putObject({
		Bucket: 'ngda', Key: key, Body: message.toString()
	}, function (err, data) {
		if (err) {
			statsd.increment('s3.message.error', 1);
		} else {
			statsd.increment('s3.message.success', 1);
		}

		console.log(err, data);
	});
};