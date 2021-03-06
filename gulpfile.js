var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var gulpPug = require('gulp-pug');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('hello', function() {
	console.log('Hello!')
});

gulp.task('pug', function() {
	return gulp.src('src/pug/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError()
		}))
		.pipe(gulpPug({pretty: true}))
		.pipe(gulp.dest('src/'));
		// .pipe(browserSync.stream());
});

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'));
		// .pipe(browserSync.reload({
		// 	stream: true
		// }))
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
	gulp.watch('src/css/**/*', browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('dist', ['libs', 'img', 'fonts', 'favicon'], function() {
	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('dist'))
});

gulp.task('libs', function() {
	// return gulp.src('src/libs/**/*')
	// 	.pipe(gulp.dest('dist/libs'))
});

gulp.task('img', function() {
	// return gulp.src('src/img/**/*')
	// 	.pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
	// return gulp.src('src/fonts/**/*')
	// 	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('favicon', function() {
	// return gulp.src('src/favicon.ico')
	// 	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);