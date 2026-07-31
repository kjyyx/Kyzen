import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'src/components/Projects/Brisk/**',
    'src/components/Projects/ClarkNav/**',
    'src/components/Projects/ITS ATS/**',
    'src/components/Projects/Kairos/**',
    'src/components/Projects/LavaCraze/**',
    'src/components/Projects/Railroad-ed/**',
    'src/components/Projects/Sprint/**',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^(_|[A-Z][A-Za-z0-9]*)$',
        varsIgnorePattern: '^([A-Z][A-Za-z0-9]*|motion)$',
      }],
    },
  },
])
