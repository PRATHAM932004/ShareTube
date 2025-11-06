module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@locales': './src/locales',
          '@hooks': './src/hooks',
          '@redux': './src/redux',
          '@route': './src/route',
          '@screen': './src/screen',
          '@services': './src/services',
          '@theme': './src/theme',
          '@type': './src/type',
          '@utils': './src/utils',
          '@zSchema': './src/zSchema',
        },
      },
    ],
  ],
};
