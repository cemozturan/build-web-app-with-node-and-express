var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {

  var authoriseCheck = function(req, res, next){
      if (!req.user) {
        res.redirect('/');
      }
      next();
  };

  var getIndex = function(req, res) {
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
  };

  var getById = function(req, res) {
    var id = new ObjectId(req.params.id);
    var url = 'mongodb://localhost:27017/node-express-course';

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');

      collection.findOne({_id: id}, function(err, results) {
        // _id is the mongoDB value, what the DB assigned to the book record
        // results.bookId is the id of the book in Goodreads.
        if(results.bookId) {
          bookService.getBookById(results.bookId, function(err, book) {
            results.book = book;
            // The first argument of render is the view under /src/views,
            // which gets set in app.js by app.set('views', './src/views');
            res.render('book', {
              title: 'Hello from BOOKS',
              nav: nav,
              book: results
            });
          });
        } else {
          res.render('book', {
            title: 'Hello from BOOKS',
            nav: nav,
            book: results
          });
        }
      });
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    authoriseCheck: authoriseCheck
  };

};

module.exports = bookController;
