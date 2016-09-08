var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function() {
  authRouter.route('/signUp')
    .post(function(req, res) {
      // This prints the request body which is in JSON format because of the bodyParser we are using in app.js.
      // If we didn't have app.use(bodyParser) in app.js, req.body would be undefined
      // Now, it prints something like { userName: 'cem', password: 'dummypassword' }
      // The property names "userName/password" come from the input controls' names on the UI (index.ejs).
      console.log(req.body);
      var url = 'mongodb://localhost:27017/node-express-course';
      mongodb.connect(url, function(err, db) {
        // Even if the "users" collection doesn't exist,
        // Mongo will create it automatically the first time we insert into this collection.
        var collection = db.collection('users');
        var user = {
          username: req.body.userName,
          password: req.body.password
        };
        // Here, we'd normally do a select first to see if this username is already in our DB, and throw error if so.
        // But for now, we'll simply insert this user into our DB.
        collection.insert(user, function(err, results) {
          /*
            When passport does its initialisation phase (passport.initialize and passport.session), it
            adds some things to request messages, and one of them is the "login" function. What it does is to tell passport
            that this user is ready to sign in. During a regular sign in, where an existing user signs in with their username/password
            we wouldn't call this as the authentication would deal with it. But here, we are signing up a new user, and we
            wouldn't want them to go and login again just after signing up, so we call login explicitly.
          */
          /*
           "results" here is something like:
          {
            result: {
              ok: 1,
              n: 1
            },
            ops: [
              {
                username: "cemozturan",
                password: "fmp-course",
                _id: "57d1a5cf8b83fdceb803d851"
              }
            ],
            insertedCount: 1,
            insertedIds: [
              "57d1a5cf8b83fdceb803d851"
            ]
          }

          So, we want results.ops[0]
          */
          req.login(results.ops[0], function() {
            // So, this puts the passed in user (results.ops[0] here) into session.
            // The passport does its serializeUser and deserializeUser stuff and makes that work.
            // redirect the user to the profile page
            res.redirect('/auth/profile');
          });
        });
      });
    });

  authRouter.route('/profile')
    .get(function(req, res) {
      // req.user is what passport uses to say this user is signed in and here is his information.
      // Passport appends this "user" property to request messages
      res.json(req.user);
    });
  return authRouter;
};

module.exports = router;
