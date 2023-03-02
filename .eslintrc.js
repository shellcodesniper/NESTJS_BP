module.exports = {
  parser: '@typescript-eslint/parser',
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
      },
    }
  },
  rules: {
    'no-console': 1,
    'import/prefer-default-export': 0,
    'no-namespace': 0,
    '@typescript-eslint/no-namespace': 0,
    'typescript-eslint/no-explicit-any': 0,
    'import/extensions': [0],
    'no-await-in-loop': 0,
    'no-restricted_syntax': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'no-useless-constructor': [0],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': 0,
    'no-empty-function': 0,
    'function-paren-newline': 0,
  },
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: "tsconfig.json",
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
};
