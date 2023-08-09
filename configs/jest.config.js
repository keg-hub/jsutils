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
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'text'],
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
  moduleFileExtensions: ['js', 'json', 'jsx', 'es6', `ts`, `tsx`],
  setupFilesAfterEnv: [`${ROOT_DIR}scripts/setupTests.js`],
}
