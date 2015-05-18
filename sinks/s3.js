
var AWS				= require('aws-sdk'); 
var moment			= require('moment');
var uuid			= require('node-uuid');

AWS.config.update({
	accessKeyId: process.env.accessKey, 
	secretAccessKey: process.env.secretAccessKey, 
	"region": "eu-west-1"
});

var s3 = new AWS.S3(); 

module.exports = function (message) {
	
	var key = moment().format('YYYY/MM/DD/HH') + uuid.v4();

	console.log('Writing message to S3', key);

	// write to s3
	s3.putObject({
		Bucket: 'ngda', Key: key, Body: message.toString()
	}, function(err, data) {
		console.log(err, data);
	});
};

