module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": "off",
    "no-irregular-whitespace": "off",
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "no-unused-vars": "off"
  }
};
