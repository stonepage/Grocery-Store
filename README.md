# Grocery-Store
个人练习


# ejs文件里
* 如果使用了`<%- %>`语法，则webpack里要做如下处理
new webpack.ProvidePlugin({
	+ _: 'lodash',
}),
* `否则会报错，ReferenceError: _ is not defined`

=========================================================











