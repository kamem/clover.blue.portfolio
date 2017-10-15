var gulp = require('gulp');
var minifyJs = require('gulp-uglify');
var minimist = require('minimist');
var gulpif = require('gulp-if');
var cache = require('gulp-cached');

var config = require('../config');

var args = minimist(process.argv.slice(2));


gulp.task('serverJsCopy', () => {
	gulp.src(config.server.files)
		.pipe(cache( 'serverJs' ))
		.pipe(gulpif(args.minify === 'true', minifyJs()))
		.pipe(gulp.dest(config.dest));
});

gulp.task('jsCopy', () => {
	gulp.src(config.js.files)
			.pipe(gulpif(args.minify === 'true', minifyJs()))
			.pipe(gulp.dest(config.js.dest));
});

gulp.task('imgCopy', () => {
	gulp.src(config.img.files)
			.pipe(gulp.dest(config.img.dest));
});

gulp.task('fontCopy', () => {
	gulp.src(config.font.files)
			.pipe(gulp.dest(config.font.dest));
});

gulp.task('htmlCopy', () => {
	gulp.src(config.html.files)
		.pipe(gulp.dest(config.html.dest));
});