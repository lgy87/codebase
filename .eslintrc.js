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
    "react-hooks/exhaustive-deps": "error",
    "no-use-before-define": "off",
    "react/prop-types": "off",
    "no-extra-semi": "off",
    "no-case-declarations": "off",
    "no-unused-vars": "error",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
}
