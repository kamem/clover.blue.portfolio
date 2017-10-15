var dest = 'root';
var watch = 'src';

var public = dest + '/public';
var views = 'views';

var settings = {
	dest: dest,
	watch: watch,
	public: public,
	html: {
		dest: dest + '/' + views + '/',
		watch: watch + '/' + views + '/',
	},
	css: {
		dest: public + '/css/',
		watch: watch + '/css/'
	},
	img: {
		dest: public + '/img/',
		watch: watch + '/img/'
	},
	js: {
		dest: public + '/js/',
		watch: watch + '/js/'
	},
	font: {
		dest: public + '/font/',
		watch: watch + '/font/'
	},
	server: {
		dest: dest + '/server/',
		watch: watch + '/server/'
	}
};

settings.html.files = settings.html.watch + '**/*.ejs';
settings.css.files = settings.css.watch + '**/*.css';
settings.js.files =  settings.js.watch + '**/*.js';
settings.img.files =  settings.img.watch + '**/*.{jpg,gif,png}';
settings.font.files =  settings.font.watch + '**/*.{eot,ttf,woff}';

settings.server.files =  settings.server.watch + '**/*.js';

module.exports = settings;