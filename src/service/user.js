/*
* @Author: GARNET
* @Date:   2018-04-11 18:31:14
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-11 19:10:07
*/


var gs = require('../utils/gs');

const User = {

	// 检查登录状态
	checkLogin: function(resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/get_user_info.do'),
			method: 'post',
			success: resolve,
			error: reject
		})
	},

	// 用户登出
	logout: function(resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/logout.do'),
			method: 'post',
			success: resolve,
			error: reject
		})
	},




}










module.exports = User;


