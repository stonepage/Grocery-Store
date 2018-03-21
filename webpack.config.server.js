const _path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const config = {
	target: 'node',
	entry: {
		app: _path.resolve(__dirname, './server/entry.js')
	},

	output: {
		filename: 'server-entry.js',
		path: _path.join(__dirname, 'dist'),
		publicPath: '/dist/',
		libraryTarget: 'commonjs2',
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
			// 			loader: 'less-loader'
			// 			// options: `{'sourceMap':true,'modifyVars':${JSON.stringify(theme)}}`
			// 		}]
			// 	}))
			// 	// include: [
			// 	// 	_path.resolve(__dirname, 'asset/css'),
			// 	// 	_path.resolve(__dirname, 'node_modules/antd-mobile')
			// 	// ]
			// },
			// {
			// 	test: /\.(css)$/,
			// 	use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		use: [{
			// 			loader: 'css-loader'
			// 			// options: {
			// 			// 	modules: true,
			// 			// 	localIdentName: '[name]__[local]__[hash:base64:5]'
			// 			// }
			// 		}]
			// 	}))
			// },

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
		],
	},

	// plugins: [
	// 	// 生成 vendor chunk，抽取第三方模块单独打包成独立的 chunk
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: 'vendor',
	// 		filename: 'server-vendor.js',
	// 		chunks: ['app', 'vendor']
	// 	}),
	// 	// 抽取 webpack loader 公共部分的代码到 manifest.js中，避免每次打包时hash发生变化
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: 'manifest',
	// 		filename: 'server-manifest.js',
	// 		chunks: ['vendor']
	// 	}),

	// 	new ExtractTextPlugin('[name].css'),

	// 	// Note that webpack.HotModuleReplacementPlugin is required to fully enable HMR
	// 	new webpack.HotModuleReplacementPlugin(),

	// 	new webpack.NoEmitOnErrorsPlugin(),			// 保证出错时页面不阻塞，且会在编译结束后报错

	// ],

	// resolve: {
	// 	extensions: ['.js', 'jsx']
	// },

}











module.exports = config;

