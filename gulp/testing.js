'use strict';

let gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'q', 'run-sequence', 'del']
  }),
  environment = require('./lib/environment.js');

// Mocha tests
gulp.task('mochaTests', false, () => {
  let reporter = environment.get('reporter', 'progress');
  return gulp.src(['dist/**/*.tests.js'], {read: false})
  // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe($.mocha({reporter: reporter}))
    .pipe(gulp.dest('coverage'));
});

// Code coverage report
// TODO: fix tests coverage
gulp.task('testCoverage', 'Generate a test coverage report (for mocha tests only)', () =>
  $.runSequence(['build', 'cleanCoverage'], 'copyNonTs', () =>
    gulp.src('dist/**/*.js')
      .pipe($.istanbul())
      .pipe($.istanbul.hookRequire())
      .on('finish', function () {
        gulp.src(['dist/**/*.tests.js'])
          .pipe($.mocha({reporter: 'spec'}))
          .pipe($.istanbul.writeReports({
              dir: './coverage',
              reporters: ['lcov'],
              reportOpts: {dir: './coverage'}
            })
          );
      })
  )
);

// Cleans the coverage folder
gulp.task('cleanCoverage', false, () => $.del(['coverage']));

// Main test tasks
gulp.task('test', 'Run unit tests (once)', ['build'], () => {
  gulp.start('mochaTests');
});

gulp.task('testWithoutBuild', 'Run unit tests(once) without building application', ['mochaTests']);
