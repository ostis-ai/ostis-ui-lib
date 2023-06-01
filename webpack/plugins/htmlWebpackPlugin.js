const HtmlWebpackPlugin = require('html-webpack-plugin');
const { relativeRoot } = require('../utils');
const config = {
  template: relativeRoot('public/index.html'),
  favicon: relativeRoot('public/favicon.svg'),
  filename: 'index.html',
};
module.exports = new HtmlWebpackPlugin(config);
