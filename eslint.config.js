const { fileURLToPath } = require('url');
const { dirname } = require('path');
const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');

// Vérifiez si __dirname existe déjà
const currentDirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url));

// Module exports
module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: currentDirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
