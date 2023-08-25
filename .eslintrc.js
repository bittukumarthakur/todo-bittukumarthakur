module.exports = {
  "env": {
    "browser": true,
    "es2019": true
  },

  parserOptions: {
    ecmaVersion: "latest"
  },

  "ignorePatterns": [".eslintrc.js"],

  rules: {
    "semi": ["error", "always"],
    "camelcase": ["error"],
    "id-length": ["warn", { max: 25 }],
    "prefer-const": ["error"],
    "valid-typeof": ["error"],

    "no-new": ["error"],
    "no-undef-init": ["error"],
    "no-irregular-whitespace": ["error"],
    "no-eval": ["error"],

    "max-classes-per-file": ["error", 3],
    "max-params": ["warn", 4],
    "max-lines-per-function": ["error", 60],
    "max-depth": ["error", 3]
  }
}