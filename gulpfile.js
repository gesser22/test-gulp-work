const gulp = require('gulp'),
      concat = require('gulp-concat');
      autoprefixer = require('gulp-autoprefixer'),
      cleanCss = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      del = require('del');
      browserSync = require('browser-sync').create(),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      imagemin = require('gulp-imagemin'),
      gulpPngquant = require('gulp-pngquant');


const cssfiles = [
  './app/sass/reset.scss',
  './app/sass/vars.scss',
  './app/sass/main.scss',
  './app/sass/media.scss'
]
const jsfiles = [
  './app/js/common.js'
]
function imageMinifi () {
	return gulp.src('./app/images/**/*.{jpg,png,svg,gif,ico}')
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [gulpPngquant()]
  }))
  .pipe(gulp.dest('./dist/images'));
}

function sassCompile () {
  return gulp.src(cssfiles)
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cleanCss({
    level: 2
  }))
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream())
}
// scripts
function scripts () {
  return gulp.src(jsfiles)
  .pipe(sourcemaps.init())
  .pipe(concat('common.js'))
  .pipe(uglify({
    toplevel: true
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/js'))
  .pipe(browserSync.stream())
}
function redir () {
  return gulp.src('./*.html') 
	.pipe(gulp.dest('dist'));
}
function clean () {
  return del(['dist/*'])
}
function watch () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    host: 'localhost',
    port: 9000
  })
  gulp.watch('./app/css/**/*.js', scripts)
  gulp.watch('./sass/**/*.scss', sassCompile)
  gulp.watch('./app/images/**/*', imageMinifi)
  gulp.watch('./*.html').on('change', browserSync.reload)
}
 
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('sassCompile', sassCompile);
gulp.task('imageMinifi', imageMinifi);
gulp.task('redir', redir);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, imageMinifi, redir, gulp.parallel('scripts', 'sassCompile')));