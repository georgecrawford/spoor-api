/* global beforeEach, afterEach, describe, it, console */

'use strict';

var expect = require('chai').expect;
var httpResponse = require('../../lib/response');

describe('Spoor', function () {

	// FIXME attach spies on this
	var req = { url: '/px.gif' };
	var res = { setHeader: function () { }, end: function () { } };

	it('Must be passed a http response object', function () {
		expect(httpResponse(req, res)).to.be.true
	});

});
