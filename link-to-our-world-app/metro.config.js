const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    sourceExts: ["cjs", "app.js", "js", "jsx", "json", "app.ts", "ts", "tsx"],
  },
};
