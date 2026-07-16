const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  watchFolders: [require('path').resolve(__dirname, '../shared')],
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
  },
});
