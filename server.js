
var express			= require('express');
var bodyParser		= require('body-parser')

// Metrics - TODO - move to a small app with one dyno
require('./lib/metrics/sqsAttributes');
require('./lib/metrics/cloudwatch');

const PORT		= process.env.PORT || 5101; 

var app = express();

var px = new express.Router();

px.use(bodyParser.raw({ limit: '50kb', type: 'application/json' }));
px.use(require('./lib/middleware/stats'));
px.use(require('./lib/middleware/anonymous-uuid'));
px.use('/',	require('./lib/middleware/response'));

app.use('/px.gif', px);

// FIXME - handle errors, 404s etc.

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
});
