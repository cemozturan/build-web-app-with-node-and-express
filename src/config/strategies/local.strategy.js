/*
 This file is for the local authentication.
 The reason this is in a separate file, not in the existing passport.js, is that
 if were to provide other authentication strategies, like Passport Google, Passport Facebook, etc.,
 we wouldn't want to have all of them in a single file. We would implement each separately in their own files.
*/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
  /*
    Make passport use a LocalStrategy.
    The first thing LocalStrategy takes in is a JSON object with a username field and a password field.
    We set these fields to the names of the username and password fields we have on the UI.
    Since we named them userName and password in the sign up form, this is what we use here.
    then it takes a function that it uses to determine whether or not this is a valid sign in.
  */
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  },
  function(username, password, done) {
    var url = 'mongodb://localhost:27017/node-express-course';

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('users');
      // if there is more than one entities, findOne() returns the first entity.
      collection.findOne(
        {username: username},
        function(err, results) {
          // Ideally, we'd check for errors here
          var user = results;
          done(null, user); // no error, and the user
      });
    });
  }));
};
