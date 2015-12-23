var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');

gulp.task('build', function() {
	gulp.src([
		'bower_components/eventemitter/build/eventemitter.js',
		'src/helpers.js',
		'src/EventEmitter.js',
		'src/*.js'
	])
	.pipe(concat('location.js'))
	.pipe(wrapper({
		header: '(function() {',
		footer: 'window.$location = {Location: Location, Browser: Browser};' +
						'}());'
	}))
	.pipe(uglify())
	.pipe(gulp.dest('build'));
});