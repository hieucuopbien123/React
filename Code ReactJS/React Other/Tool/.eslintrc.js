module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "linebreak-style": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_$",
        argsIgnorePattern: "^_$",
        ignoreRestSiblings: true,
      },
    ],
    "no-console": "off",
    "no-prototype-builtins": "off",
    "no-empty": "warn",
    "react/prop-types": "off",
    "prettier/prettier": ["warn"],
  },
};
