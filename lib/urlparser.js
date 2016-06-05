"use strict";

exports.parse = parse;

function parse(data) {
	return data.match(/<img[^>]+src="http([^">]+)/g)[0].match(/http([^">]+)/g)[0];
}
