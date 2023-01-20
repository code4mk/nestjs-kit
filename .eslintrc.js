module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['eslint:recommended', 'airbnb-base'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/**', 'test/**'],
  rules: {
    // eslint core rules.
    'class-methods-use-this': 0,
    'no-useless-constructor': 0,
    'no-unused-vars': 0,
    'no-empty-function': 0,
    'prefer-const': 0,
    'max-len': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-useless-concat': 0,
    'no-useless-escape': 0,
    'no-constructor-return': 0,
    'no-unreachable': 0,
    'consistent-return': 0,
    'no-shadow': 0,
    'lines-between-class-members': 0,

    // eslint-config-import rules.
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,

    // "@typescript-eslint/interface-name-prefix": "off",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/no-explicit-any": "off",
  },
};
