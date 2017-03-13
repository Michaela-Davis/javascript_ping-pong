
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
//more dependencies will be added here.


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
