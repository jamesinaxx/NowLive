const DotenvPlugin = require('dotenv-webpack');
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const rules = require('./webpack.rules');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index'),
    background: path.resolve(__dirname, '..', 'src', 'scripts', 'background'),
    authcheck: path.resolve(__dirname, '..', 'src', 'scripts', 'authcheck'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  module: {
    rules,
  },
  plugins: [
    new EslintPlugin({ eslintPath: require.resolve('eslint') }),
    new HtmlWebpackPlugin({
      // prettier-ignore
      template: path.resolve(__dirname, '..', 'src', 'template.html'),
      minify: true,
      inject: true,
      chunks: ['index'],
    }),
    new DotenvPlugin({ path: path.resolve(__dirname, '..', '.env') }),
  ],
};

module.exports = config;
