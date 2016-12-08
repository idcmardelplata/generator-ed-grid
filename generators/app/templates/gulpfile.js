var gulp         = require('gulp');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var browserSync  = require('browser-sync');
var sourcemaps   = require('gulp-sourcemaps');
var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');

var server = browserSync.create();

var postcssPlugins = [
  autoprefixer({browsers: 'last 2 versions'}),
  cssnano({core:true})
];

var sassOptions = {
  outputStyle: 'expanded'
};

gulp.task('styles', function() {
  gulp.src('./scss/styles.scss')
      .pipe(plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit('end');
        }
      }))
      .pipe(sass(sassOptions))
      .pipe(postcss(postcssPlugins))
      .pipe(plumber.stop())
      .pipe(gulp.dest('./css'))
      .pipe(server.stream())
});

gulp.task('compileCore', function() {
  gulp.src('./scss/ed-grid/ed-grid.scss')
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest('./css'))
});

gulp.task('sw', function() {
  gulp.watch('./scss/**.scss', ['styles']);
});

gulp.task('default', function() {
  server.init({
    server: {
      baseDir: '.'
    },

    serveStatic: ['./js']
  })

  gulp.watch('./scss/**.scss', ['styles']);
  gulp.watch('./*.html').on('change', server.reload);
  gulp.watch('./js/*.js').on('change', server.reload);
});
