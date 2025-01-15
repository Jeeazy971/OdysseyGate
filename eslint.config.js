import { fileURLToPath } from 'url';
import { dirname } from 'path';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: ['node_modules/**', 'dist/**'], // Exclut les dossiers inutiles
  },
  {
    files: ['src/**/*.ts', 'test/**/*.ts'], // Inclut les fichiers TypeScript dans src/ et test/
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
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
