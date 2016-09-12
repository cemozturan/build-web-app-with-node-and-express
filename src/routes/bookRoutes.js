var express = require('express');
var bookRouter = express.Router();

var router = function(nav) {

  // Get the book controller and service
  var bookService = require('../services/goodreadsService.js')();
  var bookController = require('../controllers/bookController.js')(bookService, nav);

  // Authorize all the book routes, so if there is no user in session we get redirected to the login page
  bookRouter.use(bookController.authoriseCheck);

  // Set the book router up. In addition to .get(), you can setup all other HTTP verbs at once like .get().post().put().etc...
  bookRouter.route('/') // /books/
    .get(bookController.getIndex);

  // Whatever is beyond the slash, Express is going to give us as a property within the request parameters.
  // So, in this case, we can do req.params.id to get the id from the URL.
  bookRouter.route('/:id') // /books/1
    .get(bookController.getById);

  return bookRouter;
};

module.exports = router;
