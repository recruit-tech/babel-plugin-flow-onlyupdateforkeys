const path = require('path');

module.exports = {
  testPathIgnorePatterns: [
    surroundFilePathSeparator('__fixtures__'),
    surroundFilePathSeparator('__snapshots__'),
  ],
  verbose: true,
};

function surroundFilePathSeparator(str) {
  return path.sep + str + path.sep;
}
