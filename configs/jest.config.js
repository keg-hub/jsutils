const path = require('path')
const ROOT_DIR = path.join(__dirname, '../')

module.exports = {
  rootDir: '../',
  verbose: false,
  clearMocks: true,
  maxWorkers: '50%',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  globals: {
    __DEV__: true,
  },
  testMatch: [
    '<rootDir>/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/**/__tests__/*.{js,jsx,ts,tsx}',
  ],
  transform: {
    '\\.[jt]sx?$': [
      'esbuild-jest',
      {
        target: `esnext`,
        sourcemap: true,
      },
    ],
    '\\.(js|jsx|mjs|cjs|ts|tsx)?$': [
      'esbuild-jest',
      {
        target: `esnext`,
        sourcemap: true,
      },
    ],
  },
  modulePathIgnorePatterns: ['<rootDir>/App'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: [ 'text-summary', 'text' ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/coverage/**',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!**/*.spec.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: [ 'js', 'json', 'jsx', 'es6', `ts`, `tsx` ],
  setupFilesAfterEnv: [`${ROOT_DIR}scripts/setupTests.js`],
  moduleNameMapper: {
    [`^@array/(.*)$`]: path.join(ROOT_DIR, './src/array/$1'),
    [`^@boolean/(.*)$`]: path.join(ROOT_DIR, './src/boolean/$1'),
    [`^@collection/(.*)$`]: path.join(ROOT_DIR, './src/collection/$1'),
    [`^@dom/(.*)$`]: path.join(ROOT_DIR, './src/dom/$1'),
    [`^@ext/(.*)$`]: path.join(ROOT_DIR, './src/ext/$1'),
    [`^@log/(.*)$`]: path.join(ROOT_DIR, './src/log/$1'),
    [`^@method/(.*)$`]: path.join(ROOT_DIR, './src/method/$1'),
    [`^@node/(.*)$`]: path.join(ROOT_DIR, './src/node/$1'),
    [`^@number/(.*)$`]: path.join(ROOT_DIR, './src/number/$1'),
    [`^@object/(.*)$`]: path.join(ROOT_DIR, './src/object/$1'),
    [`^@promise/(.*)$`]: path.join(ROOT_DIR, './src/promise/$1'),
    [`^@regex/(.*)$`]: path.join(ROOT_DIR, './src/regex/$1'),
    [`^@string/(.*)$`]: path.join(ROOT_DIR, './src/string/$1'),
    [`^@url/(.*)$`]: path.join(ROOT_DIR, './src/url/$1'),
    [`^@validation/(.*)$`]: path.join(ROOT_DIR, './src/validation/$1'),
  },
}
