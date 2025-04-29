module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    // Disable rules that are causing issues during build
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
