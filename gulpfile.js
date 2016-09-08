var gulp = require('gulp');

// We also run "npm i --save-dev gulp-jshint gulp-jscs jshint-stylish" to get some more packages that'll help.
// Required to jshint our JS files in a gulp task
var jshint = require('gulp-jshint');

var jscs = require('gulp-jscs');

// Required to auto-restart our server when there are file changes.
var nodemon = require('gulp-nodemon');

// In order to have gulp do something, we need to create a task.

// We want to get all our JS files, but not the ones under node_modules and all.
// *.js will include app.js and gulpfile.js as they are in this very directory.
// src/**/*.js will include all the .js files under src, no matter where they are under src.
var jsFiles = ['*.js', 'src/**/*.js'];

// Let's first check our JS coding styles. This task will also take in a function, which
// is the function Gulp will execute when we run "gulp style"
gulp.task('style', function() {
  // Gulp basically streams through a series of events. So, first, we tell it where we are going to get everything from.
  return gulp.src(jsFiles) // returning means we're returning this stream so we can use it as a subtask in other areas.
      .pipe(jshint()) // Then jshint it
      .pipe(jshint.reporter('jshint-stylish', { // and pass the results to reporter
        verbose: true
      }))
      .pipe(jscs()); // JSCS doesn't seem to be doing anything for me??? Should have flagged JS style issues like function(){}
      // JSHint works, though. Flagging missing semicolons, etc.
});

// Using wiredep to make Gulp inject our CSS and JS files into html, so we don't have to add a new script tag
// every time we add a new file.
gulp.task('inject', function() {
  var wiredep = require('wiredep').stream; // Used to inject bower packages' css and js
  var inject = require('gulp-inject'); // used to inject our own dependencies, css files and JS files

  var injectSrc = gulp.src([
    './public/css/*.css',
    './public/js/*.js'], {read: false}); // We just the need the file names, not the contents. So we set read to false, which basically doesn't read the contents.

  var injectOptions = {
    ignorePath: '/public'
  };

  // wiredep firstly looks at the bower.json file to check the dependencies so we tell it where the bower.json is.
  // Things inside bower.json, like bootstrap, has their own bower.json files. And wiredep will check the "main" property in those files
  // to see where it should be looking at for files. Notice that .css files are not listed in bootstrap's bower.json's "main". So,
  // we added an "override" in our own bower.json, which wiredep will use and find the files. The same is done for font-awesome as well.
  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib', // directory where wiredep will be looking for stuff. E.g., when it sees bootstrap in bower.json, it needs to know where to find it.
    ignorePath: '../../public' // we use this so that in our html,instead of ../../public/lib/file, we get /lib/file
  };

  return gulp.src('./src/views/*.html')
      .pipe(wiredep(options))
      .pipe(inject(injectSrc, injectOptions))
      .pipe(gulp.dest('./src/views')); // pipe them back into the views directory, every single html file found by gulp.src gets put back with wiredep changes
});

// So, when we run "gulp serve", it'll first run "style" and "inject", and then execute its own function.
// "style" and "inject" will run at the same time, asyncly, so make sure nothing requires the other one.
// If they do require, then we should make them dependent up in that task.
gulp.task('serve', ['style', 'inject'], function() {
  var options = {
    script: 'app.js',
    delayTime: 1, // it'll wait for 1 second before it runs that restart
    env: {
      'PORT': 3000 // connection strings and all would also go here
    },
    watch: jsFiles // files to watch for changes
  };

  return nodemon(options)
    .on('restart', function(ev) { // when the nodemon restarts (which happens on a watched file change), calls this function
      console.log('Restarting...');
    });
});
