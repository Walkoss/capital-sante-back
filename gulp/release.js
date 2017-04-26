'use strict';

//Dependencies
let gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'concurrent-transform', 'del', 'q']
  });
$.fs = require('fs');
$.environment = require('./lib/environment.js');

gulp.task('package', 'Builds and zips the application', ['build'], () => {

  return gulp.src(['**/*', '!node_modules', '!node_modules/**/*', '!src', '!src/**/*'])

  //Tar all files into single
    .pipe($.tar('release.tar'))

    //Compress tarball
    .pipe($.gzip())

    //Write file to tmp folder
    .pipe(gulp.dest('tmp'));
});
