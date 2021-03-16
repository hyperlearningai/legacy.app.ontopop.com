module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    'cypress/globals': true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    }
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
  ],
  plugins: [
    'import',
    'security',
    'react',
    'react-hooks',
    'html',
    'cypress'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable',
    localStorage: true
  },
  rules: {
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': ['error', 'only-multiline'],
    'react/react-in-jsx-scope': 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'no-case-declarations': 0,
    'import/extensions': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'no-await-in-loop': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'no-continue': 0,
    'max-len': [2, 200, 4, { ignoreUrls: true }],
    semi: [2, 'never'],
    radix: 0,
    'security/detect-object-injection': 0,
    'no-plusplus': 0,
    'consistent-return': 0
  }
}
