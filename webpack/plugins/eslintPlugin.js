const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = new ESLintPlugin({
  extensions: ['ts', 'tsx'],
  exclude: ['node_modules', 'webpack', 'scripts'],
  failOnError: true,
  lintDirtyModulesOnly: true,
});
