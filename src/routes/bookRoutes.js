var express = require('express');
var bookRouter = express.Router();

var router = function(nav) {
  // Create the list of books
  var books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Tolstoy',
      read: false
    },
    {
      title: 'C# in Depth',
      genre: 'Software',
      author: 'Jon Skeet',
      read: false
    },
    {
      title: 'Madonna in Fur Coat',
      genre: 'Romance',
      author: 'Sabahattin Ali',
      read: true
    },
    {
      title: 'Master and Margarita',
      genre: 'Fiction',
      author: 'N. Bulgakov',
      read: false
    },
    {
      title: 'Shredded Wheat',
      genre: 'Food',
      author: 'Ms. Nestle',
      read: true
    },
  ];

  // Set the book router up. In addition to .get(), you can setup all other HTTP verbs at once like .get().post().put().etc...
  bookRouter.route('/') // /books/
    .get(function(req, res) {
      res.render('books', {
        title: 'Hello from BOOKS',
        nav: nav,
        books: books
        });
    });

  // Whatever is beyond the slash, Express is going to give us as a property within the request parameters.
  // So, in this case, we can do req.params.id to get the id from the URL.
  bookRouter.route('/:id') // /books/1
    .get(function(req, res) {
      var id = req.params.id;
      res.render('book', {
        title: 'Hello from BOOKS',
        nav: nav,
        book: books[id]
        });
    });

  return bookRouter;
};

module.exports = router;
