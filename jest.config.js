const path = require('path')
module.exports = {
  roots: [path.join(__dirname, '/src')],
  displayName: 'local',
  testMatch: ['<rootDir>/src/**/(*.)test.{js, jsx}'],
  testURL: 'http://localhost',
  setupFilesAfterEnv: [path.join(__dirname, '/src/setupTests.js')],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
    "\\.(css|scss|less)$": "identity-obj-proxy",
  },
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'svg', 'css', 'scss'],
  /**
   * Threshold config disabled for now, will be enabled later on.
  */
  // coverageThreshold: {
  //   "global": {
  //     "branches": 80,
  //     "functions": 80,
  //     "lines": 80,
  //     "statements": -10
  //   },
  //   './src/**/*':{
  //     "branches": 80,
  //     "functions": 80,
  //     "lines": 80,
  //     "statements": -10
  //   }
  // },
}
