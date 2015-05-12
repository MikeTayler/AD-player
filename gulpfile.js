var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    lr = require('tiny-lr'),
    server = lr();

// Server - listed on localhost:8080
gulp.task('webserver', function() {
    connect.server();
});

gulp.task('styles', function() {
    return gulp.src('dev/sass/main.scss')
        .pipe(plumber({
            errorHandler: function(err) {
                console.log('Styles: ' + err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(concat('styles.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({
            message: 'Styles done..'
        }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('dev/js/*.js')
        .pipe(plumber({
            errorHandler: function(err) {
                console.log('Scripts: ' + err);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'Scripts done..'
        }));
});

// Images
gulp.task('images', function() {
    return gulp.src('dev/images/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({
            message: 'Images done..'
        }));
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('dev/sass/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('dev/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('dev/img/**/*', ['images']);

    // Create LiveReload server
    var server = livereload();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/css/**', 'dist/js/**', 'dist/img/**', 'dist/*.html']).on('change', function(file) {
        server.changed(file.path);
    });

});

gulp.task('default', ['webserver', 'styles', 'scripts', 'images', 'watch']);