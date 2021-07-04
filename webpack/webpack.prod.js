const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

/**
 * @type {webpack.Configuration}
 */
const config = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new ESLintPlugin({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
		new MiniCssExtractPlugin(),
	],
	optimization: {
		minimizer: [`...`, new CssMinimizerPlugin(), new JsonMinimizerPlugin()],
	},
};

module.exports = merge(common, config);
