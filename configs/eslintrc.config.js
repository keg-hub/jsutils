module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: require('path').join(__dirname, '../'),
  },
  root: true,
  ignorePatterns: ['build', 'dist', 'node_modules', 'examples', 'scripts'],
  globals: {
    jest: true,
    __DEV__: true,
    expect: true,
    React: true,
  },
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['plugin:jest/recommended'],
  rules: {
    /* General */
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'brace-style': ['error', 'stroustrup'],
    indent: ['error', 2, { offsetTernaryExpressions: true }],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'id-length': 'off',
    'one-var': ['error', 'never'],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'newline-per-chained-call': 2,
    'array-bracket-spacing': [
      'error',
      'always',
      {
        arraysInArrays: false,
        singleValue: false,
        objectsInArrays: false,
      },
    ],
    'space-in-parens': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        varsIgnorePattern: '_|err',
      },
    ],
    /* Jest */
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'off',
    'jest/no-conditional-expect': 'off',
    'jest/valid-expect': 'error',
  },
}
