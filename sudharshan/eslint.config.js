import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
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
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // This portfolio is a React Three Fiber experience: hooks, contexts and UI
    // components drive the 3D scene through imperative refs and direct three.js
    // mutation inside useFrame/useMemo — the idiomatic R3F pattern, not React
    // state misuse. The React Compiler rules (react-hooks v6) can't model it,
    // so they are scoped off for the scene-driving code only.
    files: [
      'src/components/canvas/**/*.{js,jsx}',
      'src/components/dom/**/*.{js,jsx}',
      'src/components/ui/**/*.{js,jsx}',
      'src/context/**/*.{js,jsx}',
      'src/hooks/**/*.{js,jsx}',
    ],
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
    },
  },
])
