module.exports = {
  verbose: true,
  setupFiles: [
    './setupTests.js'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  reporters: [
    'default'
  ],
  testMatch: [
    '<rootDir>/**/__test__/**/*.test.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ]
};
