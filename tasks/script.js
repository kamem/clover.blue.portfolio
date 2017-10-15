var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyJs = require('gulp-uglify');

var config = require('../config');

gulp.task('script', () => {
	gulp.src([
		"node_modules/lodash/lodash.min.js",
		"node_modules/react/dist/react.min.js",
		"node_modules/react-dom/dist/react-dom.min.js",
		"node_modules/redux/dist/redux.min.js",
		"node_modules/react-redux/dist/react-redux.min.js",
		"node_modules/history/umd/history.min.js",
		"node_modules/react-router/umd/ReactRouter.min.js"
	])
		.pipe(concat('plugins.js'))
		.pipe(minifyJs())
		.pipe(gulp.dest(config.js.dest));
});
