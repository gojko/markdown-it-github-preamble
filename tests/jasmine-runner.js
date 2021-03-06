/*global jasmine, require, process*/
'use strict';
const Jasmine = require('jasmine'),
	SpecReporter = require('jasmine-spec-reporter').SpecReporter,
	jrunner = new Jasmine(),
	runJasmine = function () {
		let filter;
		process.argv.slice(2).forEach(option => {
			if (option === 'full') {
				jasmine.getEnv().clearReporters();
				jasmine.getEnv().addReporter(new SpecReporter({
					displayStacktrace: 'all'
				}));
			}
			if (option === 'ci') {
				jasmine.getEnv().clearReporters();
				jasmine.getEnv().addReporter(new SpecReporter({
					displayStacktrace: 'all',
					displaySpecDuration: true,
					displaySuiteNumber: true,
					colors: false,
					prefixes: {
						success: '[pass] ',
						failure: '[fail] ',
						pending: '[skip] '
					}
				}));
			}
			if (option.match('^filter=')) {
				filter = option.match('^filter=(.*)')[1];
			}
		});
		jrunner.loadConfig({
			'spec_dir': 'tests',
			'spec_files': [
				'**/*[sS]pec.js'
			]
		});
		jrunner.execute(undefined, filter);
	};

runJasmine();
