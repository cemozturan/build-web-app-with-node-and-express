var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {

  // Set the book router up. In addition to .get(), you can setup all other HTTP verbs at once like .get().post().put().etc...
  bookRouter.route('/') // /books/
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/node-express-course';

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        // "find" would take in an object that represents a query, but since we want everything in this case, we pass in {}
        // we'll use a query when we select a single item in /book/:id
        collection.find({}).toArray(
          function(err, results) {
            res.render('books', {
              title: 'Hello from BOOKS',
              nav: nav,
              books: results
            });
          });
        });
    });

  // Whatever is beyond the slash, Express is going to give us as a property within the request parameters.
  // So, in this case, we can do req.params.id to get the id from the URL.
  bookRouter.route('/:id') // /books/1
    .get(function(req, res) {
      var id = new ObjectId(req.params.id);
      var url = 'mongodb://localhost:27017/node-express-course';

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');

        collection.findOne({_id: id}, function(err, results) {
          // The first argument of render is the view under /src/views,
          // which gets set in app.js by app.set('views', './src/views');
          res.render('book', {
            title: 'Hello from BOOKS',
            nav: nav,
            book: results
          });
        });
      });
    });

  return bookRouter;
};

module.exports = router;
