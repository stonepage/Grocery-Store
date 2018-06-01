/*
* @Author: GARNET
* @Date:   2018-03-27 17:02:25
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-28 11:55:56
*/


import gs from '../../utils/gs';
import formValidate from '../../utils/formValidate';
import _user from '../../service/user';
import '../../assets/css/mixin.less';
import styles from './index.css';
import errMsgTpl from '../common/tpl/errMsg.tpl';



function formError(flag, errMsg) {
	var dom = gs.renderTpl(errMsgTpl, {
		errMsg: errMsg
	});
	if (flag) {
		$('.err-con').addClass('hide').find('.err-msg').text('');
		$('.ok-con').removeClass('hide').find('.ok-msg').text('此用户名可以注册');
	} else {
		$('.err-con').removeClass('hide').find('.err-msg').text(dom);
		$('.ok-con').addClass('hide').find('.ok-msg').text('');
	}
	
}

// 用户注册
function UserRegister() {}

UserRegister.prototype = {

	constructor: UserRegister,

	init: function() {
		this.initSelectors();
		this.bindEvent();
	},


	initSelectors: function() {
		this.$userContent = $('.user-content');
		this.$username = $('#username');
		this.$password = $('#password');
		this.$passwordConfirm = $('#passwordConfirm');
		this.$phone = $('#phone');
		this.$email = $('#email');
		this.$question = $('#question');
		this.$answer = $('#answer');
		this.$submitRegister = $('#submitRegister');

		// return this;
	},

	bindEvent: function() {
		var _t = this;

		// 验证用户名是否已存在
		this.$username.blur(function(e) {
			var username = $.trim($(this).val());
			if (username) {
				_user.checkUsername(username, function(res) {
					formError(true)
				}, function(errMsg) {
					formError(false, errMsg)
				})
			}
			return false;
		});

		// 注册按钮点击
		this.$submitRegister.on('click', function(e) {
			_t.submitRegister();

		});

		// 按回车提交
		this.$userContent.on('keyup', function(e) {
			if (e.keyCode === 13) {
				_t.submitRegister();
			}
		});


	},

	// 注册提交
	submitRegister: function() {
		let source = gs.getUrlParam(window.location.href).redirect;
		var formData = {
			username: $.trim(this.$username.val()),
			password: $.trim(this.$password.val()),
			passwordConfirm: $.trim(this.$passwordConfirm.val()),
			phone: $.trim(this.$phone.val()),
			email: $.trim(this.$email.val()),
			question: $.trim(this.$question.val()),
			answer: $.trim(this.$answer.val())
		};
		// 注册表单验证
		var validateResult = formValidate(formData, {checkAll: true});

		// 验证通过
		if (validateResult.status) {
			_user.userRegister(formData, function(res) {
				window.location.href = './result.html?type=register';
			}, function(errMsg) {
				formError(false, errMsg);
			})
		// 验证失败
		} else {
			formError(false, validateResult.msg);
		}
	}

}


$(function() {

	let userRegister = new UserRegister();
	userRegister.init();

});





