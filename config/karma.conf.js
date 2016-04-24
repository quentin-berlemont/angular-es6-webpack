const webpackTestConfig = require('./webpack.test.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
        { pattern: 'test.context.js', watched: false }
    ],
    frameworks: ['mocha', 'chai', 'sinon'],
    preprocessors: {
      'test.context.js': ['coverage', 'webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir : '../coverage/',
      reporters: [
        { type: 'json', subdir: 'json' },
        { type: 'html', subdir: 'html' }
      ]
    },
    webpack: webpackTestConfig,
    webpackServer: {
      noInfo: true
    },
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true
  })
}
