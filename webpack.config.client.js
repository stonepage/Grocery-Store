const _path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');


const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
	entry: {
		app: [
			'react-hot-loader/patch',
			_path.resolve(__dirname, 'index.js')
		],
		vendor: [
			'react',
			'react-dom',
			'react-router',
			'react-router-dom'
		]
	},

	output: {
		filename: '[name].[hash].js',
		path: _path.join(__dirname, 'dist'),
		publicPath: '/public/',
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
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'less-loader'
						// options: `{'sourceMap':true,'modifyVars':${JSON.stringify(theme)}}`
					}]
				}))
				// include: [
				// 	_path.resolve(__dirname, 'asset/css'),
				// 	_path.resolve(__dirname, 'node_modules/antd-mobile')
				// ]
			},
			{
				test: /\.(css)$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader'
						// options: {
						// 	modules: true,
						// 	localIdentName: '[name]__[local]__[hash:base64:5]'
						// }
					}]
				}))
			},
			// {
			// 	test: /\.(jpe?g|png|gif|ico)/i,
			// 	exclude: /node_modules/,
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			limit: 20000,
			// 			name: '[name].[ext]'
			// 		}
			// 	}]
			// },
			// {
			// 	test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			// 	loader: 'file-loader?name=./font/[name].[ext]'
			// }
			// {
			// 	test: /\.(ejs)/i,
			// 	loader: 'ejs-loader'
			// },
			// {
			// 	test: /\.html$/,
			// 	loader: 'raw-loader'
			// }
		]
	},

	plugins: [
		// 生成 vendor chunk，抽取第三方模块单独打包成独立的 chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			chunks: ['app', 'vendor']
		}),
		// 抽取 webpack loader 公共部分的代码到 manifest.js中，避免每次打包时hash发生变化
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			filename: 'manifest.js',
			chunks: ['vendor']
		}),

		new ExtractTextPlugin('[name].css'),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),

		// Note that webpack.HotModuleReplacementPlugin is required to fully enable HMR
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NoEmitOnErrorsPlugin(),			// 保证出错时页面不阻塞，且会在编译结束后报错

		new HtmlWebpackPlugin({
			template: _path.join(__dirname, 'template/appBuild.html'),
			filename: 'app.html',			// *生成的位置以 output._path 的值作为根目录
		})
	],

	resolve: {
		extensions: ['.js', 'jsx']
	},
}


// 开发环境
if (isDevelopment) {
	config.devServer = {
		// proxy: {
		// 	// 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
		// 	// koa 代码在 ./mock 目录中，启动命令为 npm run mock
		// 	'/api': {
		// 		target: 'http://localhost:3000',
		// 		secure: false
		// 	}
		// },
		host: '0.0.0.0',
		port: 9999,
		contentBase: _path.join(__dirname, 'dist'),
		hot: true,
		publicPath: '/public/',
		historyApiFallback: {
			index: '/public/app.html',
			rewrites: [{
				from: /^\/$/,
				to: '/public/app.html'
			}]
		},
		overlay: {
			errors: true,
		},
		compress: true,		// gzip
	};
	config.devtool = 'cheap-module-eval-source-map';
} else {
// 生产环境

	config.devtool = '';
};









module.exports = config;

