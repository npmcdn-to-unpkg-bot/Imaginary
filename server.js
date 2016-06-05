"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var feed = require('./lib/feed.js');

app.get('/', function(req, res){
  res.send({status: 200});
});

io.on('connection', function(socket) {
  console.log(socket + 'connected');
  var currentFeed = null;

  socket.on('connect', function() {
    console.log('Socket connected.');
  });

  socket.on('disconnect', function() {
    console.log('Socket disconnected.');
  });

  socket.on('search', function(data) {
    console.log('search!');

    if(currentFeed !== null) {
      clearInterval(currentFeed);
    }

    feed.setFeed(socket, data, function(refreshIntervalId) {
      currentFeed = refreshIntervalId;
    });
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
