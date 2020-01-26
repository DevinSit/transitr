/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path");

module.exports = {
    resolver: {
        extraNodeModules: {
            src: path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src", "components"),
            hooks: path.resolve(__dirname, "src", "hooks"),
            models: path.resolve(__dirname, "src", "models"),
            scenes: path.resolve(__dirname, "src", "scenes"),
            store: path.resolve(__dirname, "src", "store"),
            styles: path.resolve(__dirname, "src", "styles"),
            utils: path.resolve(__dirname, "src", "utils")
        }
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
};
