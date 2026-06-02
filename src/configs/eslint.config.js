// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const rnPlugin = require("eslint-plugin-react-native");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = defineConfig([
  {
    ignores: ["functions/**", "dist/**", ".expo/**", "node_modules/**"],
  },
  expoConfig,
  {
    plugins: {
      "react-native": rnPlugin,
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      "no-console": "warn",
      "import/no-cycle": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-native/no-inline-styles": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  {
    files: ["**/*.test.js", "**/*.test.ts", "**/jest.setup.js"],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
]);
