module.exports = {
  "env": {
    "browser": true,
    "es2019": true
  },

  "ignorePatterns": [".eslintrc.js"],

  rules: {
    "semi": ["error", "always"],
    "camelcase": ["error"],
    "id-length": ["warn", { max: 15 }],
    "prefer-const": ["error"],
    "valid-typeof": ["error"],

    "no-new": ["error"],
    "no-undef-init": ["error"],
    "no-irregular-whitespace": ["error"],
    "no-eval": ["error"],

    "max-classes-per-file": ["error", 3],
    "max-params": ["warn", 3],
    "max-lines-per-function": ["error", 10],
    "max-depth": ["error", 3]
  }
}