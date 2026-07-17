const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

const defaultConfig = getDefaultConfig(projectRoot);

module.exports = mergeConfig(defaultConfig, {
  watchFolders: [monorepoRoot],
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
  },
});
