const { IS_PROD } = require('./env');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  minimize: false,
  minimizer: [new TerserWebpackPlugin({ extractComments: false })],
  moduleIds: IS_PROD ? 'deterministic' : 'natural',
};
