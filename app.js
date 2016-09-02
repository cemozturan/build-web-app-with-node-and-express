// This gives us a reference to Express, but doesn't give us the ability to really do anything with it.
var express = require('express');

// We create an instance of Express we can do something with.
var app = express();

// The port that Express listens on our machine. let's just pick 5000.
var port = process.env.PORT || 5000;

// Create a book router
var bookRouter = express.Router();

// app.use() sets up some middleware. Whatever we do is app.use() is executed by Express first before it does anything else.
// The reason we are doing is to be able to serve public files from a static directory.
// For example, to get all the css files (styles.css, bootstrap.min.css, etc), Express would need individual routes, which would
// be ridicilous to set up. By setting a static directory below, we are telling Express to check there first before anything else.
// For example, if a request comes for 'css/styles.css', Express will first look inside the 'public' folder and serve that static file up if finds it.
// After that, it starts to do the routes.
// Now, we can go to http://localhost:5000/css/styles.css and get a successful response.
app.use(express.static('public'));

// Setting up a second static directory to serve the views. Express will first check the public folder, and then src/views,
// and if it still cannot find what it wants, then it'll check our app.get in our routes.
// app.use(express.static('src/views')); // Removing this as part of using a templating engine:
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Set the book router up. In addition to .get(), you can setup all other HTTP verbs at once like .get().post().put().etc...
bookRouter.route('/') // /books/
  .get(function(req, res) {
    res.send('We are at books');
  });

bookRouter.route('/single') // /books/single
  .get(function(req, res) {
    res.send('We are at a single book');
  });

// Tell the app that we are gonna use the book router
app.use('/books', bookRouter);

// '/' is the home route, so in this case localhost:5000
// Also, we pass Express a function that tells it what to do when this route is hit.
// The function takes in two parameters; request (info that is coming from the browser, eg., if it is a post it'll be the whole body)
// and response (this is what we are going to be dealing with).
// So, this is Express taking a request from the browser, and sending it something back.
app.get('/', function(req, res) {
  //res.send('Hello world'); // removing this as part of using a templating engine
  res.render('index', {
    title: 'Hello from EJS',
    nav: [
      {Link: '/books', Text: 'Books'},
      {Link: '/authors', Text: 'Authors'}]});
});

app.get('/books', function(req, res) {
  res.send('Hello books');
});

// We fire the Express instance off.
// Takes a couple of parameters; a port and a callback.
app.listen(port, function(err) {
  console.log('Running server on port ' + port);
});
