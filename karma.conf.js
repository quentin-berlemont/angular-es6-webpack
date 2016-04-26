var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    files: [
        { pattern: './spec.bundle.js', watched: false }
    ],
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon'],
    preprocessors: {
      './spec.bundle.js': ['coverage', 'webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir : './coverage',
      reporters: [
        { type: 'json', subdir: 'json' },
        { type: 'html', subdir: 'html' }
      ]
    },
    webpack: webpackTestConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true
  })
}
