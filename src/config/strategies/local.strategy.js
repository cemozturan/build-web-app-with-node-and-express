/*
 This file is for the local authentication.
 The reason this is in a separate file, not in the existing passport.js, is that
 if were to provide other authentication strategies, like Passport Google, Passport Facebook, etc.,
 we wouldn't want to have all of them in a single file. We would implement each separately in their own files.
*/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
    // For now, create a user, and pass it to the callback.
    // We'll do db integration later.
    var user = {
      username: username,
      password: password
    };
    done(null, user); // no error, and the user
  }));
};
