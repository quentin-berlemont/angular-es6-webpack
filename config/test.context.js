var context = require.context('../src/app', true, /\.js$/);
context.keys().forEach(context);
