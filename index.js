#!/usr/bin/env node

var
	optimist = require('optimist');

var 
	Bundler = require('./lib/Bundler.js');

/**
 * Application object
 */
var App = {};

/**
 * Log to console
 */
App.log = function(msg) {
	if(App.conf.verbose) {
		console.log('ejs-bundler: ' + msg);
	}
}

/**
 * Log error to console
 */
App.error = function(msg) {
	if(App.conf.verbose) {
		console.error('ejs-bundler: ' + msg);
	}
}

/**
 * Command line configuration
 */
App.conf = optimist
	.usage('Usage: ejs-bundler [-u] [-p=<path>] [-o=<path>] <files>')

	.default({
		'u'			: false,
		'p'			: './',
		'object'	: 'window.EJSTemplates',
		'o'			: undefined,
		'v'			: false
	})

	.string('o')
	.alias('o', 'out')
	.describe('o', 'Output file')

	.boolean('u')
	.alias('u', 'uglify')
	.describe('u', 'Compress with ugilfy.js')


	.boolean('v')
	.alias('v', 'verbose')
	.describe('v', 'Output system information')

	.string('p')
	.alias('p', 'path')
	.describe('p', 'Root dir path')

	.string('object')
	.describe('Hash which contains templates')

	.argv;

/**
 * Templates list
 */
App.templates = App.conf._;

if(App.templates.length == 0) {
	optimist.showHelp();
	process.exit();
}



/**
 * Bundler instance
 */
App.bundler = Bundler(App, App.templates);

