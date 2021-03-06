'use strict';

var url = require('url');

var Event = function Event(req) {

	this.message = {
		envelope: {
			headers: req.headers || {}
		},
		message: req.body ? req.body.toString() : {}
	};

	this.message.envelope.url = url.parse(req.url);

	this.message.envelope.time = {
		received: new Date().toISOString()
	};
};

Event.prototype.toString = function () {
	return JSON.stringify(this.message);
};

module.exports = Event;