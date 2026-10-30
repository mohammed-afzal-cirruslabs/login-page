/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@ecom/config/eslint'],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.next/',
    'build/',
    '.turbo/',
    '*.config.js',
    '*.config.ts',
    'postcss.config.js',
  ],
}
