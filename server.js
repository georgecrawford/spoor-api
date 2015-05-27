
var http			= require('http');
var response		= require('./lib/response');

// Metrics
require('./lib/metrics/sqsAttributes');
require('./lib/metrics/cloudwatch');

const PORT		= process.env.PORT || 5101; 

var server = http.createServer(response);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
