const package = require("./package.json")
const reactVersion = package.dependencies.react

module.exports = {
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["prettier", "react", "jsx-a11y", "import", "react-hooks"],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jest: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-use-before-define": "off",
    "react/prop-types": "off",
    "no-extra-semi": "off",
    "no-case-declarations": "off",
    "no-unused-vars": "warn",
  },
  settings: {
    settings: {
      "import/resolver": {
        webpack: {
          config: "webpack/config.js",
        },
      },
    },
    react: {
      version: reactVersion,
    },
  },
}
