/*
* @Author: GARNET
* @Date:   2018-04-05 17:41:49
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-09 15:14:32
*/

'use strict';

// import htmlTips from './tips.ejs';
// import Hogan from 'hogan.js';
var Hogan = require('hogan.js');
var htmlTips = require('../view/tips.ejs');



var config = {
	serverHost: '',
};


var gs = {

	request: function(json) {
		let _t = this;
		$.ajax({
			type: json.method || 'get',
			url: json.url || '',
			dataType: json.dataType || 'json',
			success: function(res) {
				// 请求成功
				if (res.status === 0) {
					json.success && json.success(res.data, res.msg);
				} else if (res.status === 10) {
					// 没有登录状态，邀强制登录
					_t.doLogin();
				} else if (res.status === 1) {
					// 参数错误
					json.error && json.error(res.msg);
				}
			},
			error: function(err) {
				// 网络问题
				json.error && json.error(res.msg);
			}
		})
	},


	// 获取server url
	getServerUrl: function(path) {
		return config.serverHost + path;
	},

	// 获取url参数
	getUrlParam: function(url) {
		if (typeof url != 'string') {
			return;
		}
		var str = url;
		if (str.indexOf('?') > -1) {
			str = decodeURIComponent(str).substr(str.indexOf('?') + 1);
		}
		var arr = str.split('&');
		var json = {};
		for (var i = 0; i < arr.length; i++) {
			var rst = arr[i].split('=');
			json[rst[0]] = rst[1];
		}
		return json;
	},

	// 渲染模板
	renderTpl: function(template, data) {
		if (!arguments.length) {
			return false;
		}
		var tpl = Hogan.compile(template);
		if (arguments.length == 1) {
			return tpl;
		} else if (arguments.length == 2) {
			var result = tpl.render(data);
			return result;
		}

	},

	// 通用提示——成功
	successTips: function(msg) {
		alert(msg || '操作成功！');
	},

	// 通用提示——错误
	errorTips: function(msg) {
		alert(msg || '好像哪里不对~');
	},

	// 字段验证
	validate: function(value, type) {
		var value = $.trim(value);
		// 非空验证
		if (type === 'required') {
			return !!value;
		}
		// 手机号验证
		if (type === 'cellphone') {
			return /^1\d{10}$/.text(value);
		}
		// 邮箱验证
		if (type === 'email') {
			return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.text(value);
		}
	},

	// 统一登录
	doLogin: function() {
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	
	// 跳回首页
	gotoIndex: function() {
		window.location.href = './app.html';
	}







};










module.exports = gs;



















// ============================================================

// 通用提示——成功
// successTips: function(msg) {
// 	var tpl = htmlTips;
// 	return this.renderTpl(tpl, msg);
// }

// export function getByStyle(ele, attr) {
// 	if (window.getComputedStyle) {
// 		return window.getComputedStyle(ele, false)[attr];
// 	} else {
// 		if (ele.currentStyle) {
// 			// 具体参考 jq - getWidthOrHeight
// 			if (attr === 'width' || attr === 'height') {
// 				var val = attr === 'width' ? 'offsetWidth' : 'offsetHeight';
// 			}
// 			return ele.currentStyle[val];
// 		}
// 	}
// }


// // n-0
// // m-10
// // Math.random()*(10-0) + 0
// // [0, 10)
// export function rnd(n, m) {
// 	return parseInt(Math.random()*(m-n) + n);
// }


// export function json2url(json) {
// 	var arr = [];
// 	for (key in json) {
// 		arr.push(key + '=' + encodeURIComponent(json[key]));
// 	}
// 	return arr.join('&');
// }









