
var Event = function (options) {

	this.options = options;
	this.time = {
		received: new Date().toISOString()
	}
	this.message = {
		envelope: { },
		body: { }
	}
}

Event.prototype.envelope = function (key, value) {
	this.message.envelope[key] = value;
};

Event.prototype.toString = function () {
	return JSON.stringify(this.message);
};

module.exports = Event;
