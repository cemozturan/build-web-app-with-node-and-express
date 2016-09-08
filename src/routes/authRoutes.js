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
      /*
        When passport does its initialisation phase (passport.initialize and passport.session), it
        adds some things to request messages, and one of them is the "login" function. What it does is to tell passport
        that this user is ready to sign in. During a regular sign in, where an existing user signs in with their username/password
        we wouldn't call this as the authentication would deal with it. But here, we are signing up a new user, and we
        wouldn't want them to go and login again just after signing up, so we call login explicitly.
      */
      // req.body is expected to be the user here
      req.login(req.body, function() {
        // So, this puts the passed in user (req.body here) into session.
        // The passport does its serializeUser and deserializeUser stuff and makes that work.
        // redirect the user to the profile page
        res.redirect('/auth/profile');
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
