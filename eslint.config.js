import js from '@eslint/js';
import nextPlugin from 'eslint-plugin-react/configs/recommended.js';
import hooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const nextConfig = {
  ...nextPlugin,
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  languageOptions: {
    ...nextPlugin.languageOptions,
    parserOptions: {
      ...nextPlugin.languageOptions?.parserOptions,
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: 'module',
    },
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
      React: 'writable',
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    ...nextPlugin.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};

export default tseslint.config(
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': hooksPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  nextConfig
);
