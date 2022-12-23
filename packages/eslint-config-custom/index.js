module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "turbo",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
  },
  ignorePatterns: ["**/dist"],
};
