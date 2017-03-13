var del = require('del');
var utilities = require('gulp-util');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
//more dependencies will be added here.

var buildProduction = utilities.env.production;


gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js']) //* is the wildcard symbol, anything ending in -interface.js in the js folder will be concatenated
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ["concatInterface"], function() {
  return browserify({ entries: ['./js/pingpong-interface.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});


// This is a good task to run periodically as you develop, and when you need some help debugging.
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
