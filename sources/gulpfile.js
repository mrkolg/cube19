var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    csscomb = require('postcss-csscomb'),
    mqpacker = require('css-mqpacker'),
    sortCSSmq = require('sort-css-media-queries');

var processors = [
    csscomb(require('./.csscomb.json')),
    mqpacker({
        sort: sortCSSmq.desktopFirst
    })
];

gulp.task('sass', function () {
  return gulp.src('html/scss/style.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 5
    }))
    .pipe(autoprefixer({browsers: ['last 1 versions']}))
    .pipe(postcss(processors))
    .pipe(rename('style-main.css'))
    .pipe(gulp.dest('../assets/css/'))
});

gulp.task('default', ['sass']);
