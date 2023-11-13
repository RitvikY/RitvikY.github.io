const standard = require("eslint-config-standard");
module.exports = {
  extends: ["standard"],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "linebreak-style": 0,
    "no-param-reassign": [2, { props: false }],
    "no-unused-vars": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};
