/*
* @Author: GARNET
* @Date:   2018-03-27 17:02:25
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-18 11:28:00
*/


import gs from '../../utils/gs';
import _user from '../../service/user';
import '../../assets/css/mixin.less';
import styles from './index.css';
import errMsgTpl from './errMsg.tpl';



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
		this.$cellphone = $('#cellphone');
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
			cellphone: $.trim(this.$cellphone.val()),
			email: $.trim(this.$email.val()),
			question: $.trim(this.$question.val()),
			answer: $.trim(this.$answer.val())
		};
		// 注册表单验证
		var validateResult = this.formValidate(formData);

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

	},

	// 注册表单验证
	formValidate: function(formData) {
		var result = {
			status: false,
			msg: ''
		};

		if (!gs.validate(formData.username, 'required')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!gs.validate(formData.password, 'required')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (formData.password.length < 6) {
			result.msg = '密码长度不能少于6位';
			return result;
		}

		// 验证两次密码是否一致
		if (formData.password !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}

		// 验证手机号
		if (!gs.validate(formData.cellphone, 'cellphone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证邮箱
		if (!gs.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		// 验证密码提示问题
		if (!gs.validate(formData.question, 'required')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 验证密码提示问题答案
		if (!gs.validate(formData.answer, 'required')) {
			result.msg = '密码提示问题答案不能为空';
			return result;
		}


		// 验证通过
		result.status = true;
		result.msg = '验证通过';
		return result;

	}


}


$(function() {

	let userRegister = new UserRegister();
	userRegister.init();

});





