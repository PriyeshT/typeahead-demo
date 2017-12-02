const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
	devtool: 'source-map',
	entry: ['./src/js/app.js', './src/scss/main.scss'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			}
		]
	},
	plugins: [
		// uglify js
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			output: { comments: false },
			sourceMap: true
		}),

		// environment
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(nodeEnv)}
		}),
		
		new ExtractTextPlugin({ // define where to save the file
	      filename: '[name].css',
	      allChunks: true,
	    }),

	    new HtmlWebpackPlugin({
	    	filename: 'index.html',
	    	template: './src/index.html'
	    })
	],
	devServer: {
		inline: true,
		contentBase: './build',
		port: 5000
	}
}