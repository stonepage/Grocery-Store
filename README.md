# Grocery-Store
DEMO

=========================================================

> 静态页面使用ejs结合html
> 动态页面使用.tpl
> 渲染数据时，使用 Hogan.js——A compiler for the Mustache templating language [http://twitter.github.com/hogan.js]
> 然后配合模板中的Mustache语法

=========================================================

> ejs文件里
* 如果使用了`<%- %>`语法，则webpack里要做如下处理
new webpack.ProvidePlugin({
	+ _: 'lodash',
}),
* `否则会报错，ReferenceError: _ is not defined`

=========================================================

> 关于 webpack
不知道从什么时候开始报下面这个错误..shit
(node:34076) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
parseQuery() will be replaced with getOptions() in the next major version of loader-utils.

=========================================================

> 关于ESlint
在加了一条规则［"no-extra-semi": "off"］之后，发现跑开发环境时，会开始报错
Error: duplicated mapping key at line 83, column 25: "no-extra-semi": "off"



