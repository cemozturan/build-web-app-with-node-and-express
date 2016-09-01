var gulp = require('gulp');

// We also run "npm i --save-dev gulp-jshint gulp-jscs jshint-stylish" to get some more packages that'll help.
// Required to jshint our JS files in a gulp task
var jshint = require('gulp-jshint');

// In order to have gulp do something, we need to create a task.

// We want to get all our JS files, but not the ones under node_modules and all.
// *.js will include app.js and gulpfile.js as they are in this very directory.
// src/**/*.js will include all the .js files under src, no matter where they are under src.
var jsFiles = ['*.js', 'src/**/*.js'];

// Let's first check our styles. This task will also take in a function, which
// is the function Gulp will execute when we run "gulp style"
gulp.task('style', function() {
  // Gulp basically streams thorugh a series of events. So, first, we tell it where we are going to get everything from.
  gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {
        verbose: true
      }));
});
