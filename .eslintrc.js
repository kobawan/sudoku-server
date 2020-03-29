module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "airbnb",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["scripts/"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": ["error", "unix"],
    "no-unused-vars": 0,
    "class-methods-use-this": 0,
    "lines-between-class-members": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "import/prefer-default-export": 0,
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        ignores: ["modules"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        mjs: "never",
      },
    ],
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".js", ".ts", ".json", ".node"],
      },
    ],
  },
};
