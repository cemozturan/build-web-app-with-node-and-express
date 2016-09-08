var passport = require('passport');

module.exports = function (app) {
  // Get the two Passport things that are needed
  app.use(passport.initialize()); // sets itself up and gets everything going
  app.use(passport.session()); // passport session sits on top on express session, this is where passport keeps and handles user stuff

  // Takes in a function which itself takes in a user object and a callback
  passport.serializeUser(function(user, done){
    // This is where we get ready to package the user object into whatever we want.
    // callback takes in error and result as usual in node, we pass in null instead of error here
    // as we are not doing anything that would cause an error
    console.log('called serializeUser');
    done(null, user);
    // If we want to store only the id, or email we would have "done(null, user.id)" or "done(null, user.email)"
  });

  passport.deserializeUser(function(user, done){

    // If we were getting the user from the DB, we would do mongodb.find() etc. here.
    // Also, if we stored only the id in serializeUser method, we would call our parameter "userId" instead of "user"
    // because that's what we'd be looking for in the DB. We can choose any name we want, but the deserializeUser method
    // looks for whatever format the user object was stored inside the serializeUser method.
    console.log('called deserializeUser');
    done(null, user);
  });

  // Execute the local strategy
  require('./strategies/local.strategy')();
};

/*
To start using passport, initialize and session functions are needed.

After that, passport uses a couple of functions to handle our user and user session:

1) serializeUser() to bundle up our user into the session to store for later AND

2) deserializeUser() to pull the user back out of the session

Sometimes, in serializeUser, we'd use just the ID instead of the whole object,
and then in deserializeUser we'd go back to the db and pull the whole user out of the db.

And the last piece it needs is a strategy, which we'll be using "passport-local" for in this case.
It's used for local authentication, where we store a username and password in our local db, and check against that.

Other strategies could be Passport Google, Passport Facebook, Passport Twitter to do
all of our OAuth against those third-party OAuth providers.
*/
