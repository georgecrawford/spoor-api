'use strict';

var uuid = require('node-uuid');

module.exports = function (req, res, next) {
	var guid = uuid();
	req.headers['x-anon'] = guid; // FIXME override if found in the client
	res.setHeader('X-Anon', guid);
	next();
};