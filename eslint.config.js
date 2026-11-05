const expoConfig = require('eslint-config-expo/flat');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    ignores: [
      '.agents/**',
      '.expo/**',
      'assets/**',
      'colors/**',
      'components/**',
      'dist/**',
      'fonts/**',
      'my-expo-app/**',
      'nextjs/**',
      'preview/**',
      'react/**',
      'react-native/**',
      'tokens/**',
      'typography/**',
    ],
  },
  ...expoConfig,
]);
