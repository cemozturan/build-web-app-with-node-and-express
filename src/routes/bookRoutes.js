var express = require('express');
var bookRouter = express.Router();

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
      nav: [
        {Link: '/books', Text: 'Books'},
        {Link: '/authors', Text: 'Authors'}
      ],
      books: books
      });
  });

bookRouter.route('/single') // /books/single
  .get(function(req, res) {
    res.send('We are at a single book');
  });

module.exports = bookRouter;
