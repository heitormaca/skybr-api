import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import nodePlugin from 'eslint-plugin-node'
import prettierPlugin from 'eslint-plugin-prettier'

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
  recommendedConfig: js.configs.recommended,
})

export default [
  // 0) ignore build
  { ignores: ['dist/**'] },

  // 1) herda configs legados
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ),

  // 2) regras para TS e Node
  {
    files: ['*.ts'],
    languageOptions: {
      env: { node: true, es2021: true },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      node: nodePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'node/no-unsupported-features/es-syntax': 'error',
      'prettier/prettier': 'error',
    },
  },
]
