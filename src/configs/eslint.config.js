// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    files: ["**/*.test.js", "**/*.test.ts", "**/jest.setup.js"],
    env: {
      jest: true,
    },
    ignores: ["dist/*"],
  },
]);
