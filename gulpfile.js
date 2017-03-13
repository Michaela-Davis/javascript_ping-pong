
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
//more dependencies will be added here.


gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js']) //* is the wildcard symbol, anything ending in -interface.js in the js folder will be concatenated
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', function() {
  return browserify({ entries: ['./js/*-interface.js'] })//* is the wildcard symbol, anything ending in -interface.js in the js folder will be browserified
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});
