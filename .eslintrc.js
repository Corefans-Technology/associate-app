/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  env: {
    amd: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: "module", // Allows using import/export statements
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
  ],
  rules: {
    indent: ["error", 2],
    quotes: ["warn", "double"],
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "no-undef": "warn",
    "no-console": 1,
    "comma-dangle": ["warn", "always-multiline"],
    "vue/html-self-closing": [
      "warn",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
      },
    ],
  },
}
