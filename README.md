# Imaginary Image Gallery

##

This is an image gallery app that pulls images from the Flickr public feed. You can filter the feed by tags by searching. Separate keywords by spaces and watch the images appear.

## Setup Instructions (OSX)

To run this app you have to have Node installed.

You also need to install the dependencies from npm. Navigate to the repository folder and enter

	$ npm install

Then start the server

	$ node server.js

The server is responsible for pulling new images from the Flickr stream API, and connects to the frontend using Socket.io.

To view the gallery, start index.html

# Tests

To run the (few) unit tests

	$ npm run unit-test