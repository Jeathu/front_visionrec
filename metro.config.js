const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
require('./loadEnv');

module.exports = withNativeWind(config, { input: "./app/global.css" });
