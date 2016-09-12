var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

// Create the list of books
var books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Master and Margarita',
    genre: 'Fiction',
    author: 'M. Bulgakov',
    bookId: 117833,
    read: false
  },
  {
    title: 'C# in Depth',
    genre: 'Software',
    author: 'Jon Skeet',
    bookId: 7789280,
    read: false
  },
  {
    title: 'Madonna in Fur Coat',
    genre: 'Romance',
    author: 'Sabahattin Ali',
    bookId: 220826,
    read: true
  }
];

var router = function(nav) {

  adminRouter.route('/addBooks')
    .get(function(req, res) {
      // 27017 is the default port number for mongoDB, can be changed.
      // In cmd, run "mongo" to be able to write mongo commands,
      // then "show dbs" to see the available databases
      var url = 'mongodb://localhost:27017/node-express-course';

      mongodb.connect(url, function(err, db) {
        // You can think of MongoDB collections as tables in SQL.
        // They are actually different but they are close enough to wrap your head around by thinking that way.
        // Unlike SQL Server, you can't do a query to multiple collections at one time.
        // There is no joining, no selecting across.
        var collection = db.collection('books');

        // results are the same array we passed in but with some mongoDB properties
        // To insert a single book, pass in a json object instead of an array ("results" in our case) and call insertOne
        // To remove the entities in the "books" collection, run "db.books.remove({})"
        collection.insertMany(books, function(err, results) {
          // To see the collections in cmd, run "mongo node-express-course" (mongo db_name),
          // then "show collections", and then "db.books.find()" or even "db.books.find().pretty()"
          // To delete the "node-express-course" database, run "mongo node-express-course" and then "db.dropDatabase()"
          res.send(results);
          db.close();
        });
      });
      // calling db.close() here won't work because the insertMany is async, and we should not close the connection until it is completed.
    });

  return adminRouter;
};

module.exports = router;
