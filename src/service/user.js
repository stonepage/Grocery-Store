/*
* @Author: GARNET
* @Date:   2018-04-11 18:31:14
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-25 19:38:03
*/


var gs = require('../utils/gs');

const User = {

	// 用户登录
	userLogin: function(userInfo, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/login.do'),
			data: userInfo,
			method: 'post',
			success: resolve,
			error: reject
		})
	},

	// 用户注册
	userRegister: function(userInfo, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/register.do'),
			data: userInfo,
			method: 'post',
			success: resolve,
			error: reject
		})
	},

	// 用户注册时检查用户名是否已存在
	checkUsername: function(username, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/check_valid.do'),
			data: {
				type: 'username',
				str: username
			},
			method: 'post',
			success: resolve,
			error: reject
		})
	},


	// 检查登录状态
	checkLoginStatus: function(resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/get_user_info.do'),
			method: 'post',
			success: resolve,
			error: reject
		})
	},

	// 用户登出
	userLogout: function(resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/logout.do'),
			method: 'post',
			success: resolve,
			error: reject
		})
	},


	// 找回密码——获取提示问题
	getQuestion: function(username, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/forget_get_question.do'),
			data: {
				username: username
			},
			method: 'post',
			success: resolve,
			error: reject
		})	
	},

	// 找回密码——发送问题答案，获取token
	checkAnswer: function(userInfo, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/forget_check_answer.do'),
			data: userInfo,
			method: 'post',
			success: resolve,
			error: reject
		})	
	},


	// 找回密码——设置新密码
	resetPassword: function(newpassword, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/forget_reset_password.do'),
			data: newpassword,
			method: 'post',
			success: resolve,
			error: reject
		})
	},


	// 用户中心——获取用户信息
	getUserInfo: function(resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/get_information.do'),
			method: 'post',
			success: resolve,
			error: reject
		})	
	},

	// 用户信息更新
	updateUserInfo: function(newUserInfo, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/update_information.do'),
			data: newUserInfo,
			method: 'post',
			success: resolve,
			error: reject
		})	
	},

	// 登录后的修改密码
	updatePassword: function(newUserInfo, resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/user/reset_password.do'),
			data: newUserInfo,
			method: 'post',
			success: resolve,
			error: reject
		})	
	}




}










module.exports = User;


