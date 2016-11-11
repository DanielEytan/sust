'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var moduleImporter = require('sass-module-importer');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var webpack = require('webpack-stream');
const autoprefixer = require('gulp-autoprefixer');

var folders = {
  src: 'src/',
  build: 'html/',
};

var files = {
  sass: folders.src + 'css/**/*.scss',
  fonts: folders.src + 'font/**/*.{ttf,woff,eof,eot,css,svg,otf}',
  images: folders.src + 'image/*',
  pug: folders.src + '*.pug',
  js: folders.src + '/**/*.js'
};

gulp.task('js', function() {
  return gulp.src(files.js)
    .pipe(webpack({
      output: {
        filename: 'main.js'
      },
      resolve: {
          // Makes sure the compiler looks for modules in /src and node_modules
          modulesDirectories: [folders.build + '/js', 'node_modules']
        }
    }))
    .pipe(gulp.dest(folders.build + 'js/'))
    .pipe(reload({stream: true}));
});

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
        .pipe(gulp.dest(folders.build + 'image/'))
        .pipe(reload({stream: true}));
});
gulp.task('copy:fonts', function() {
   return gulp.src(files.fonts).pipe(gulp.dest(folders.build + 'font/'));
});

gulp.task('sass', function () {
  return gulp.src(files.sass)
    .pipe(sass({
      importer: moduleImporter(),
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions']
    }))
    .pipe(gulp.dest(folders.build + '/css'))
    .pipe(reload({stream: true}));
});


gulp.task('serve', function() {
  browserSync.init({
      server: folders.build
  });
  gulp.watch(files.pug).on('change', gulp.series('html', reload));
  gulp.watch(files.images).on('change', gulp.series('images', reload));
  gulp.watch(files.sass).on('change', gulp.series('sass', reload));
  gulp.watch(files.js).on('change', gulp.series('js', reload));
});

gulp.task('all', gulp.parallel('copy:fonts', 'images', 'sass', 'html', 'js'));

gulp.task('default', gulp.series('clean', 'all', 'serve'));
