var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function() {
  authRouter.route('/signUp')
    .post(function(req, res) {
      // This prints the request body which is in JSON format because of the bodyParser we are using in app.js.
      // If we didn't have app.use(bodyParser) in app.js, req.body would be undefined
      // Now, it prints something like { userName: 'cem', password: 'dummypassword' }
      console.log(req.body);
    });

  return authRouter;
};

module.exports = router;
