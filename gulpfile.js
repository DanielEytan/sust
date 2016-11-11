'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');

var folders = {
  src: 'src/',
  build: 'html/',
};

var files = {
  sass: folders.src + 'css/**/*.scss',
  fonts: folders.src + 'font/**/*.{ttf,woff,eof,eot,css,svg,otf}',
  images: folders.src + 'image/*'
};

gulp.task('images', ['clean'], function(){
  return gulp.src(files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(folders.build + 'image/'));
});

gulp.task('images:watch', function () {
  gulp.watch(files.images, ['images']);
});

gulp.task('clean', function(){
  return gulp.src(folders.build, {read: false}).pipe(clean());
});

gulp.task('copy:fonts', ['clean'], function() {
   return gulp.src(files.fonts).pipe(gulp.dest(folders.build + 'font/'));
});

gulp.task('sass', function () {
  return gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(folders.build + '/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(files.sass, ['sass']);
});

gulp.task('default', ['clean', 'copy:fonts', 'images', 'sass', 'sass:watch']);
