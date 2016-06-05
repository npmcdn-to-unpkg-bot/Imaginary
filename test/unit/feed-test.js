var should = require('should');
var assert = require('assert');
var feed = require('../../lib/feed.js');
var base_url = 'https://api.flickr.com/services/feeds/photos_public.gne?tagmode=any';

describe('feed unit tests', function () {
	it('should properly append params to url', function (done) {
		var result = feed.buildUrl("these are my search params");
		result.should.equal('https://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&tags=these,are,my,search,params');

		result = feed.buildUrl("");
		result.should.equal('https://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&tags=');

    	done();
    });
});