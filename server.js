
var response		= require('./lib/response');
var express			= require('express');
var bodyParser		= require('body-parser')

// Metrics
require('./lib/metrics/sqsAttributes');
require('./lib/metrics/cloudwatch');

const PORT		= process.env.PORT || 5101; 

var app = express();

app.use(bodyParser.raw({ 
	limit: '50kb',
	type: 'application/json'
}));

app.get('/px.gif', require('./lib/response'));
app.post('/px.gif', require('./lib/response'));

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
});
