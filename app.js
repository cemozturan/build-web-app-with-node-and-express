// This gives us a reference to Express, but doesn't give us the ability to really do anything with it.
var express = require('express');

// We create an instance of Express we can do something with.
var app = express();

// The port that Express listens on our machine. let's just pick 5000.
var port = 5000;

// We fire the Express instance off.
// Takes a couple of parameters; a port and a callback.
app.listen(port, function(err) {
  console.log('Running server on port ' + port);
});
