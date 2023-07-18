const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const pump = require('pump');
const runSequence = require('run-sequence');
const del = require('del');
const browserSync = require('browser-sync');

const pathInTheme = 'src';
const pathOutTheme = 'dist';

const pathToWatchLess = [pathInTheme + '/less/**/*.less'];
const pathInCss = [pathInTheme + '/less/**/style.less'];
const pathOutCss = pathOutTheme + '/css';
const pathInJs = pathInTheme + '/js/**/*.js';
const pathOutJs = pathOutTheme + '/js';
const pathInImgs = pathInTheme + '/images/**/*.';
const pathOutImgs = pathOutTheme + '/img';

const pathInJsLIB = [pathInTheme + '/lib/**/*.js'];
const pathOutJsLIB = pathOutTheme + '/lib';

const sass = require('gulp-sass');

gulp.task('less', function () {
    return gulp.src(pathInCss)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(less({paths: [ path.join(__dirname, 'less', 'includes') ]}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pathOutCss));
});

gulp.task('moveCss', function () {
    return pump([
      gulp.src(pathInTheme + '/less/style.css'),
      gulp.dest(pathOutCss)
      ]);
});

gulp.task('moveJsLib', function () {
  return pump([
    gulp.src(pathInJsLIB),
    gulp.dest(pathOutJsLIB)
    ]);
});

gulp.task('moveJs', function () {
  return pump([
    gulp.src(pathInJs),
    gulp.dest(pathOutJs)
    ]);
});

gulp.task('clean', function () {
  return del.sync(pathOutTheme);
});

gulp.task('images', function () {
  return pump([
    gulp.src(pathInImgs + '+(png|jpg|gif|svg|ico)'),
    gulp.dest(pathOutImgs)
    ]);
});

gulp.task('watchCSS', function(callback){
  runSequence('less', callback);
});

gulp.task('execAddonLess', function(){
  runSequence('copyAddonsLESS');
  setTimeout(() => {
    runSequence('less');
  }, 1000)
});

gulp.task('watchJS', function(callback){
  runSequence('lint', 'moveJs', callback);
});

gulp.task('default',  function () {
  runSequence('clean', 'images', 'moveJs','less','compileSCSS');
});

gulp.task('watch', function () {
  gulp.watch(pathToWatchLess, ['watchCSS']);
  gulp.watch(pathInJs, ['watchJS']);
});

gulp.task('compileSCSS', function() {
  return gulp.src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('start', function () {

  gulp.watch(pathInJs, ['moveJs']).on('change', browserSync.reload);
  gulp.watch('src/less/**/*.less', ['watchCSS']).on('change', browserSync.reload);
  gulp.watch(['index.html', 'src/**/*.html']).on('change', browserSync.reload);
});

