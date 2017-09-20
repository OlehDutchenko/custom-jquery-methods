'use strict';

// ----------------------------------------
// Imports
// ----------------------------------------

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');

// ----------------------------------------
// Private
// ----------------------------------------

const fnSrc = './fn/**/*.js';
const fnDest = './dist';
const docsSrc = fnSrc;
const docsDest = './api-docs';

const babelOptions = {
	presets: ['es2015'],
	plugins: ['transform-remove-strict-mode']
};

const uglifyOptions = {
	mangle: true,
	compress: {
		warnings: true
	}
};

const jsdocConfig = {
	source: {
		includePattern: '.+\\.js(docs|x)?$',
		excludePattern: '(^|\\/|\\\\)_'
	},
	tags: {
		allowUnknownTags: true,
		dictionaries: [
			'jsdoc',
			'closure'
		]
	},
	opts: {
		encoding: 'utf8',
		template: './node_modules/jsdoc-simple-theme/',
		destination: docsDest,
		recurse: true,
		debug: false,
		verbose: false
	},
	plugins: [
		'plugins/markdown',
		'./node_modules/jsdoc-export-default-interop/dist/index',
		'./node_modules/jsdoc-ignore-code/index',
		'./node_modules/jsdoc-sourcecode-tag/index'
	],
	markdown: {
		parser: 'gfm',
		hardwrap: true
	},
	templates: {
		cleverLinks: false,
		monospaceLinks: false,
		systemName: 'system API docs',
		default: {
			outputSourceFiles: true,
			layoutFile: './node_modules/jsdoc-simple-theme/tmpl/layout.tmpl'
		}
	}
};

// ----------------------------------------
// Public
// ----------------------------------------

gulp.task('docs', function (done) {
	del.sync(docsDest);
	gulp.src(docsSrc, {buffer: false})
		.pipe(jsdoc(jsdocConfig, function (err) {
			if (err) {
				console.log(err.message);
				return this.emit('end');
			}
			console.log('done');
			done();
		}));
});

gulp.task('docs-watch', gulp.series('docs', function () {
	gulp.watch(docsSrc, gulp.series('docs'));
}));

gulp.task('dist', function () {
	return gulp.src(fnSrc)
		.pipe(babel(babelOptions))
		.pipe(gulp.dest(fnDest))
		.pipe(uglify(uglifyOptions))
		.on('data', file => {
			file.extname = '.min.js';
		})
		.pipe(gulp.dest(fnDest));
});

gulp.task('concat', function () {
	return gulp.src(fnSrc)
		.pipe(babel(babelOptions))
		.pipe(concat('index.js'))
		.pipe(gulp.dest(fnDest))
		.pipe(uglify(uglifyOptions))
		.on('data', file => {
			file.extname = '.min.js';
		})
		.pipe(gulp.dest(fnDest));
});

gulp.task('dist-watch', gulp.series('dist', function () {
	gulp.watch(fnSrc, gulp.series('dist'));
}));

gulp.task('default', gulp.series('docs', 'dist', 'concat'));
