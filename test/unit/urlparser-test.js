var should = require('should');
var assert = require('assert');
var url_parser = require('../../lib/urlparser.js');

describe('urlparser unit tests', function () {
	it('should only return url tag within img tag', function (done) {
		var res = url_parser.parse('<html><body><div><img src="http://path.to.myimage.jpg"></img></div></body></html>');
		res.should.equal("http://path.to.myimage.jpg");
    	done();
    });
});