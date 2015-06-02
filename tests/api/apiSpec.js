/* global beforeEach, afterEach, describe, it, console */

'use strict';

var expect = require('chai').expect;
var fetch = require('node-fetch')

var err = function (err) {
	console.error(err);	
}

describe('Spoor API', function () {

	it('Accept GET requests, respond with a GIF', done => {
		fetch('http://localhost:5101/px.gif')
			.then(function (res) {
				expect(res.status).to.equal(200);
				expect(res.headers.get('content-type')).to.equal('image/gif');
				done();
			})
			.catch(err)
	});
	
	it('Accept POST requests, respond with JSON', done => {
		fetch('http://localhost:5101/px', { method: 'POST', headers: { 'content-type': 'application/json' } })
			.then(function (res) {
				expect(res.status).to.equal(200);
				expect(res.headers.get('content-type')).to.equal('application/json; charset=utf-8');
				done();
			})
			.catch(err)
	});
	
	xit('Reject non GET/PUT HTTP verbs');
	xit('Limit 50kb to POST bodies');
	xit('');
	xit('');
	xit('');

});
