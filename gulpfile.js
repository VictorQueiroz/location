var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');

gulp.task('build', function() {
	gulp.src(['src/*.js'])
	.pipe(concat('location.js'))
	.pipe(wrapper({
		header: '(function($window) {',
		footer: '$window.$location = {Location: Location, Browser: Browser};' +
						'}($window));'
	}))
	.pipe(uglify())
	.pipe(gulp.dest('build'));
});