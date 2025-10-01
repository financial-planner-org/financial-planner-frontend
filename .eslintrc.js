module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    // Desabilita regras problemáticas
    '@typescript-eslint/no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/alt-text': 'warn',
    '@next/next/no-img-element': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    // Adiciona regras específicas
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2020: true,
    node: true
  }
};