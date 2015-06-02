'use strict';

var express = require('express');
var bodyParser = require('body-parser');

// Metrics - TODO - move to a small app with one dyno
require('./lib/metrics/sqsAttributes');
require('./lib/metrics/cloudwatch');

var PORT = process.env.PORT || 5101;

var app = express();

var ingest = new express.Router();

ingest.use(bodyParser.raw({ limit: '50kb', type: 'application/json' }));
ingest.use(require('./lib/middleware/stats'));
ingest.use(require('./lib/middleware/anonymous-uuid'));
ingest.use('/', require('./lib/middleware/response'));

app.use('/px.gif', ingest);
app.use('/ingest', ingest);

// FIXME - handle errors, 404s etc.

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT);
});