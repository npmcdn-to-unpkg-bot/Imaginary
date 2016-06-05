"use strict";

var socket = io.connect('http://localhost:3000');

var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});

$grid.on( 'click', '.grid-item', function() {
  // remove clicked element
  $grid.masonry( 'remove', this )
    // layout remaining item elements
    .masonry('layout');
});

var MAX_NUM_IMAGES = 80;
var counter = 0;
var images = [];

socket.on('newimage', function(url) {
    counter = (counter+1)%MAX_NUM_IMAGES;

    if(images.length < MAX_NUM_IMAGES) {

      var $items = $(getItem(url, counter));
      $grid.append( $items ).masonry( 'appended', $items );
      $grid.imagesLoaded( function() {
        $grid.masonry('layout');
      });

      images.push(url);

    } else {

      images.shift();
      images.push(url);

      var imageToNuke = 'img-' + counter;
      eventFire(document.getElementById(imageToNuke), 'click');

      var $items = $(getItem(url));
      $grid.append( $items ).masonry( 'appended', $items );

    }

});

setInterval(function() {
  if(images.length > 0) {
    changeModal();
  }
}, 4000);

function changeModal() {
  var imageUrl = images[getRandomInt(0, images.length-1)];
  $("#modalImage").removeClass("hidden");
  $("#modalImage").attr("src", imageUrl.replace("_m", "_b"));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function searchIt(form) {
  socket.emit('search', $('[name="tags"]').val());
}


function getItem(url) {
  var item = '<div class="grid-item item" id="img-'+ counter +'">'+
    '<img src="'+url+'" /></div>';
  return item;
}
