/*
* @Author: GARNET
* @Date:   2018-05-17 17:57:30
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-18 17:25:48
*/

import '../../assets/css/mixin.less';
import gs from '../../utils/gs';
import _user from '../../service/user';
import stepUsernameTpl from './stepOne.tpl';
import stepAnswerTpl from './stepTwo.tpl';
import stepPasswordTpl from './stepThree.tpl';
import errMsgTpl from '../user-login/errMsg.tpl';



function formError(errMsg) {
	var dom = gs.renderTpl(errMsgTpl, {
		errMsg: errMsg
	});
	$('.err-con').removeClass('hide').find('.err-msg').text(dom);
}

function loadTpl(tpl, data) {
	return gs.renderTpl(tpl, data);
}


function PasswordReset() {}

PasswordReset.prototype = {

	constructor: PasswordReset,

	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},

	init: function() {
		this.loadResetStep();
		this.bindEvent();
	},


	loadResetStep: function() {
		this.loadStepUsername();
	},

	bindEvent: function() {
		var _t = this;
		// 找回密码第一步
		$('#submitStepOne').on('click', function(e) {
			var username = $.trim($('#stepUsername').val());
			if (username) {
				_user.getQuestion(username, function(res) {
					_t.data.username = username;
					_t.data.question = res;
					_t.loadStepQuestion(_t.data.question);
				}, function(errMsg) {
					formError(errMsg);
				})
			} else {
				formError('请输入用户名');
			}
		});
	},

	loadStepUsername: function() {
		var str = loadTpl(stepUsernameTpl, {});
		$('.step-one').html(str);
	},

	loadStepQuestion: function(data) {
		var _t = this;
		$('.step-one').html('');
		$('.err-con').addClass('hide').find('.err-msg').text('');
		var str = loadTpl(stepAnswerTpl, {
			question: data
		});
		$('.step-two').html(str);
		// 找回密码第二步
		$('#submitStepTwo').on('click', function(e) {
			var answer = $.trim($('#stepAnswer').val());
			var json = {
				username: _t.data.username,
				question: _t.data.question,
				answer: answer
			}
			if (answer) {
				// 检查密码提示问题答案
				_user.checkAnswer(json, function(res) {
					console.log(res)
					_t.data.answer = answer;
					_t.data.token = res;
					_t.loadStepPassword(_t.data.token);
				}, function(errMsg) {
					formError(errMsg);
				})
			} else {
				formError('请输入密码提示问题答案');
			}
		});
	},

	loadStepPassword: function() {
		var _t = this;
		$('.step-two').html('');
		$('.err-con').addClass('hide').find('.err-msg').text('');
		var str = loadTpl(stepPasswordTpl, {});
		$('.step-three').html(str);
		// 找回密码第三步
		$('#submitStepThree').on('click', function(e) {
			var newPassword = $.trim($('#stepPassword').val());
			var json = {
				username: _t.data.username,
				passwordNew: newPassword,
				forgetToken: _t.data.token
			}
			// 新密码不为空
			if (newPassword && newPassword.length >= 6) {
				_user.resetPassword(json, function(res) {
					console.log(res)
					window.location.href = './result.html?type=password-reset';
				}, function(errMsg) {
					formError(errMsg);
				})
			// 新密码为空	
			} else {
				formError('请输入新的密码,密码长度不得小于6位');
			}
		});
	},


}


$(function() {

	var passwordReset = new PasswordReset();
	passwordReset.init();

});


