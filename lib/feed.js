"use strict";

exports.setFeed = setFeed;
exports.buildUrl = buildUrl;

var urlparser = require('./urlparser.js');
var poller = require("feed-poll");

var base_url = 'https://api.flickr.com/services/feeds/photos_public.gne?tagmode=any';
var MAX_NUM_IMAGES = 80; //Flickr only delivers 20, but we want a memory that's bigger than that.

function setFeed(socket, data, callback) {

  var image_urls = [];
  var poll = poller([buildUrl(data)]);

  poll.on("article", function(article) {
    var parsed_url = urlparser.parse(article.content);

    if (image_urls.length < MAX_NUM_IMAGES) {
      image_urls.push(parsed_url);
      socket.emit('newimage', parsed_url);
    } else {
      if (arrayContains(parsed_url, image_urls)) {
        // It's in there already, don't emit.
      } else {
        //It wasn't in there. Remove oldest, push and emit.
        image_urls.shift();
        image_urls.push(parsed_url);
        socket.emit('newimage', parsed_url);
      }
    }

  });

  poll.on("error", function(err) {
    console.error(err);
  });

  //First poll, we don't want to have to wait for the first feed update.
  poll.start();

  var refreshIntervalId = setInterval(function() {
    
    console.log('interval-check in setFeed');
    poll.start();

  }, 10000);

  callback(refreshIntervalId);

}

function buildUrl(data) {
  var res = data.split(" ");
  var resLength = res.length;

  if(resLength > 0) {
    var url = base_url + '&tags=';
    for (var i = 0; i < resLength; i++) {
      if(i == resLength-1) {
        url = url + res[i];
      } else {
        url = url + res[i] + ',';
      }
    }
    return url;
  } else {
    return base_url;
  }
}

function arrayContains(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}