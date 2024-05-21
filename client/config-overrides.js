const { addFallback } = require('react-app-rewired');
const crypto = require('crypto-browserify');
const stream = require('stream-browserify');

module.exports = override(
  addFallback({
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
  })
);