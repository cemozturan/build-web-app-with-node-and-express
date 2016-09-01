// This gives us a reference to Express, but doesn't give us the ability to really do anything with it.
var express = require('express');

// We create an instance of Express we can do something with.
var app = express();

// The port that Express listens on our machine. let's just pick 5000.
var port = 5000;

// '/' is the home route, so in this case localhost:5000
// Also, we pass Express a function that tells it what to do when this route is hit.
// The function takes in two parameters; request (info that is coming from the browser, eg., if it is a post it'll be the whole body)
// and response (this is what we are going to be dealing with).
// So, this is Express taking a request from the browser, and sending it something back.
app.get('/', function(req, res) {
  res.send('Hello world');
});

app.get('/books', function(req, res) {
  res.send('Hello books');
});

// We fire the Express instance off.
// Takes a couple of parameters; a port and a callback.
app.listen(port, function(err) {
  console.log('Running server on port ' + port);
});
