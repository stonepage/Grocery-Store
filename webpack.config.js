/*
* @Author: GARNET
* @Date:   2018-03-27 17:47:17
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-18 11:33:34
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

let entryObj = {
	'app': [entryPath('app/app.js')],
	'user-login': [entryPath('user-login/index.js')],
	'user-register': [entryPath('user-register/index.js')],
	'password-reset': [entryPath('password-reset/index.js')],
	'result': [entryPath('result/index.js')],
	'vendor': ['jquery'],
}

var Chunks;
function assignChunks(obj) { 
	var arr = [];
	for (let key in obj) {
		arr.push(key);
	}
	return arr;
}
Chunks = assignChunks(entryObj);

// 生产环境时
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
	// 这里走的是多入口，生产环境打包完了也是多个js文件
	entry: entryObj,

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
			{
				test: /\.(less)$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader',
					}, {
						loader: 'less-loader',
					}],
					fallback: 'style-loader',
				})),
				exclude: /node_modules/,
			},
			{
				test: /\.(css)$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]__[hash:base64:5]'
						}
					}],
				})),
				// exclude: /node_modules/,
			},
			{
				test: /\.(jpe?g|png|gif|ico)\??.*$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1000,
						name: 'images/[name].[ext]',
					}
				}],
				exclude: /node_modules/,
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: 'font/[name].[ext]',
					}
				}],
			},
			{
				test: /\.(ejs)$/,
				use: [{
					// ejs-compiled-loader
					loader: 'ejs-loader',
					options: {
						// htmlmin: true,
						variable: 'data',
					}
				}]
			},
			{
				test: /\.(html|tpl)$/,
				use: [{
					loader: 'raw-loader',
				}]
			},
		]
	},

	plugins: [
		
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/vendor.js',
			chunks: Chunks
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
			_: 'underscore',
		}),

		// new webpack.NamedModulesPlugin(),

		// Note that webpack.HotModuleReplacementPlugin is required to fully enable HMR
		new webpack.HotModuleReplacementPlugin(),

		// 保证出错时页面不阻塞，且会在编译结束后报错
		new webpack.NoEmitOnErrorsPlugin(),	

		// 模板
		new HtmlWebpackPlugin(getHtmlConfig('app', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
		new HtmlWebpackPlugin(getHtmlConfig('password-reset', '找回密码')),



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

		proxy: {
			'/product/*': {
				target: "http://happymmall.com",
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/api/old-path': '/api/new-path', // rewrite path
				// 	'^/api/remove/path': '/path' // remove base path
				// },
			},
		}
	};

	config.devtool = 'cheap-module-eval-source-map';

} else {
	// 生产环境

	config.devtool = '';
};









module.exports = config;

