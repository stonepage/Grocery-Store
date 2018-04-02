/*
* @Author: GARNET
* @Date:   2018-03-27 17:47:17
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-02 14:06:48
*/
const _path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
// const theme = require('./theme');

const isDev = process.env.NODE_ENV === 'development';


function entryPath(file) {
	return _path.resolve(__dirname, 'src/page/', file);
}

let getHtmlConfig = function(name, title) {
	return {
		template: './src/view/' + name + '.ejs',
		filename: 'view/' + name + '.html',
		// favicon: './favicon.ico',
		title: title,
		inject: true,
		hash: true,
		chunks: ['manifest', 'vendor', name],
	};
};

const config = {
	entry: {
		// 这里走的是多入口，生产环境打包完了也是多个js文件
		// app: [entryPath('App.js')],
		app: [entryPath('index/index.js')],
		login: [entryPath('login/index.js')],
		vendor: ['jquery'],
	},

	output: {
		path: _path.join(__dirname, 'dist'),
		filename: 'js/[name].js',
		publicPath: isDev ? '/dist/' : '../',
	},

	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			// {
			// 	test: /\.(less)$/,
			// 	use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		use: [{
			// 			loader: 'css-loader'
			// 		}, {
			// 			loader: 'less-loader',
			// 			options: `{'sourceMap':true,'modifyVars':${JSON.stringify(theme)}}`
			// 		}]
			// 	})),
			// 	include: [
			// 		_path.resolve(__dirname, 'src/'),
			// 		// _path.resolve(__dirname, 'node_modules/antd-mobile')
			// 	],
			// },
			// Element UI
			{
				test: /\.(scss)$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader',
					}]
				})),
				include: [
					_path.resolve(__dirname, 'src/'),
				],
			},
			{
				test: /\.(css)$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						// options: {
						// 	modules: true,
						// 	localIdentName: '[name]__[local]__[hash:base64:5]'
						// }
					}],
					// 会报错，暂时不知原因
					// include: [
					// 	_path.resolve(__dirname, 'src/*/*.css'),
					// ]
				})),
			},
			{
				test: /\.(jpe?g|png|gif|ico)\??.*$/i,
				exclude: /node_modules/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1000,
						name: 'images/[name].[ext]',
					}
				}],
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=./font/[name].[ext]'
			},
			// {
			// 	test: /\.(ejs)/i,
			// 	loader: 'ejs-loader?variable=data',
			// },
			{
				test: /\.(html|ejs)$/,
				loader: 'raw-loader',
			},
		]
	},

	plugins: [
		
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/vendor.js',
			chunks: ['app', 'login', 'vendor']
		}),
		
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			filename: 'js/manifest.js',
			chunks: ['vendor']
		}),

		new ExtractTextPlugin('css/[name].css'),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			// _: 'underscore',
		}),

		// new webpack.NamedModulesPlugin(),

		// Note that webpack.HotModuleReplacementPlugin is required to fully enable HMR
		new webpack.HotModuleReplacementPlugin(),

		// 保证出错时页面不阻塞，且会在编译结束后报错
		new webpack.NoEmitOnErrorsPlugin(),	

		// 模板
		new HtmlWebpackPlugin(getHtmlConfig('app', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login', '登录')),



	],

	resolve: {
		extensions: ['.js', 'jsx']
	},
}


// 开发环境
if (isDev) {
	config.devServer = {
		host: '0.0.0.0',
		port: 9090,
		// contentBase 会报错
		// contentBase: _path.join(__dirname, 'dist'),
		hot: true,
		publicPath: '/dist/',
		historyApiFallback: true,
		// historyApiFallback: {
		// 	index: '/public/app.html',
		// 	rewrites: [{
		// 		from: /^\/$/,
		// 		to: '/public/app.html'
		// 	}]
		// },
		overlay: {
			errors: true,
		},

		// gzip
		compress: true,		
	};

	config.devtool = 'cheap-module-eval-source-map';

} else {
	// 生产环境

	config.devtool = '';
};









module.exports = config;

