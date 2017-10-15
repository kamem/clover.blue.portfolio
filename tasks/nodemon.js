var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');

var nodemon = require('gulp-nodemon')
var babel = require('gulp-babel')
var cache = require('gulp-cached');
var browserSync = require('browser-sync');

function reload() {
	browserSync.reload({ stream: false });
};

gulp.task('browsersync', function() {
	browserSync.init({
		files: [
			config.public + '/**/*.*',
			config.html.files
		], // BrowserSyncにまかせるファイル群
		proxy: 'localhost:3141', // express の動作するポートにプロキシ
		port: 4000, // BrowserSync は 4000 番ポートで起動
		open: false // ブラウザ open しない
	});
});

gulp.task('compile', function () {
	var stream = gulp.src(config.server.files)
		.pipe(cache( 'babel' ))
		.pipe(babel())
		.pipe(gulp.dest(config.dest))

	return stream
})

gulp.task('nodemon', ['compile', 'browsersync'], function () {
	var stream = nodemon({
		script: 'bin/www',
		ext: 'js json',
		exec: './node_modules/.bin/babel-node',
		watch: config.server.watch, // watch ES2015 code
		// tasks: ['compile'], // node用に変換する場合にこっちを使う（ただし変換するとちょっと遅かったので直接execでbabel-nodeを指定している）
		stdout: false  // Express の再起動時のログを監視するため
	})
	.on('readable', function(){
		this.stdout.on('data', function(chunk) {
			if (/^Express\ server\ listening/.test(chunk)) {
				reload();
			}
			process.stdout.write(chunk);
		});
		this.stderr.on('data', function(chunk) {
			process.stderr.write(chunk);
		});
	})

	return stream
})