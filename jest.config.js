module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
    '.+\\.m.(sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setupTests.ts'],

  // Module file extensions for importing
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/.jest/svgrMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/.jest/fileMock.js',
    '^@utils$': '<rootDir>/src/utils',
    '^@hooks$': '<rootDir>/src/hooks',
    '^@api$': '<rootDir>/src/api',
    '^@constants$': '<rootDir>/src/constants',
    '^@components/(.+)$': '<rootDir>/src/components/$1',
  },
};
