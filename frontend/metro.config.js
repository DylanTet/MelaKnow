// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
    const defaultConfig = await getDefaultConfig(__dirname);
    const { assetExts } = defaultConfig.resolver;
    return {
        resolver: {
            assetExts: [...assetExts, "bin"],
        },
        transformer: {
            inlineRequires: true,
        }
    };
})();