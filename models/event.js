
var url = require('url');

var eventOwner = function (u) {
	var owner = url.parse(u).pathname;
	if (!!url.parse('').pathname) {
		return { owner: a[0], eventType: a[1] }
	} else {
		return null;
	}
}

var Event = function (req) {

	this.message = {
		envelope: {
			headers: req.headers || {}
		},
		message: req.payload || {}
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
