var testContext = require.context('./src', true, /\.js$/);
testContext.keys().forEach(testContext);
