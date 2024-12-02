/* global require, __dirname, module */
const webpack = require( 'webpack' ); // to access built-in plugins
const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );

module.exports = {
	mode: 'production', // development | production
	watch: false,
	entry: {
		plugin: [
			'./src/sass/styles.scss',
			'./src/ts/index.ts',
		],
	},
	output: {
		filename: 'js/[name].bundle.js', // Output JS files to build/js
		path: path.resolve( __dirname, 'build' ),
	},
	devtool: 'source-map',
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [ 'ts-loader' ],
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
			},
		],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin( {
			filename: 'css/[name].css',
		} ),
		new CssMinimizerPlugin(),
	],
};
