var config;

switch(process.env.npm_lifecycle_event) {
  case 'dev':
    config = require('./webpack/dev.config.js');
    break;

  case 'build':
    config = require('./webpack/build.config.js');
    break;

  case 'test':
    config = require('./webpack/test.config.js');
    break;
}

module.exports = config;
