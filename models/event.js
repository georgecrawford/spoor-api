
var url = require('url');

var Event = function (req) {

	this.message = {
		envelope: {
			headers: req.headers || {}
		},
		message: req.payload ? req.payload.toString() : {}
	}
	
	this.message.envelope.url = url.parse(req.url);
	
	this.message.envelope.time = {
		received: new Date().toISOString()
	}

}

Event.prototype.toString = function () {
	return JSON.stringify(this.message);
};

module.exports = Event;
