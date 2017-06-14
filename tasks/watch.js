var gulp = require('gulp');
var watch = require('gulp-watch');

var config = require('../config');

gulp.task('watch', ['webpack', 'postcss', 'imgCopy', 'fontCopy', 'usemin'], function(){
	gulp.watch(config.css.files, ['postcss', 'webpack']);
	gulp.watch(config.js.files, ['webpack', 'usemin']);
	gulp.watch(config.html.files, ['usemin']);
	gulp.watch(config.img.files, ['imgCopy']);
	gulp.watch(config.font.files, ['fontCopy']);
});