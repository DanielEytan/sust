'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var folders = {
  src: 'src/',
  build: 'html/',
};

var files = {
  sass: folders.src + 'css/**/*.scss',
  fonts: folders.src + 'font/**/*.{ttf,woff,eof,eot,css,svg,otf}',
  images: folders.src + 'image/*',
  pug: folders.src + '*.pug'
};


gulp.task('clean', function(){
  return gulp.src(folders.build + '/*', {read: false}).pipe(clean());
});


gulp.task('html', function buildHTML() {
  return gulp.src(files.pug)
  .pipe(pug({
    pretty:  true,
    client:  false,
  }))
  .pipe(gulp.dest(folders.build));
});


gulp.task('images', function(){
  return gulp.src(files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(folders.build + 'image/'));
});
gulp.task('copy:fonts', function() {
   return gulp.src(files.fonts).pipe(gulp.dest(folders.build + 'font/'));
});

gulp.task('sass', function () {
  return gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(folders.build + '/css'));
});

gulp.task('serve', function() {
  browserSync.init({
      server: folders.build
  });

  gulp.watch(files.pug, gulp.series('html', reload));
  gulp.watch(files.images, gulp.series('images', reload));
  gulp.watch(files.sass, gulp.series('sass', reload));
});

gulp.task('all', gulp.parallel('copy:fonts', 'images', 'sass', 'html'));

gulp.task('default', gulp.series('clean', 'all', 'serve'));
