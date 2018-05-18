/*
* @Author: GARNET
* @Date:   2018-03-27 17:02:25
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-18 17:18:33
*/


import gs from '../../utils/gs';
import _user from '../../service/user';
import '../../assets/css/mixin.less';
import styles from './index.css';
import errMsgTpl from './errMsg.tpl';



function formError(errMsg) {
	var dom = gs.renderTpl(errMsgTpl, {
		errMsg: errMsg
	});
	$('.err-con').removeClass('hide').find('.err-msg').text(dom);
}



const UserLogin = {
	init: function() {
		this.bindEvent();
	},

	bindEvent: function() {
		var _t = this;
		$('#submitLogin').on('click', function(e) {
			_t.submitLogin();
		});

		$('.user-content').keyup(function(e) {
			if (e.keyCode === 13) {
				_t.submitLogin();
			}
		});

	},

	// 登录提交
	submitLogin: function() {
		let source = gs.getUrlParam(window.location.href).redirect;
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		// 表单验证结果
		var validateResult = this.formValidate(formData);
		if (validateResult.status) {
			// 验证通过
			_user.userLogin(formData, function(res) {
				window.location.href = source || './app.html';
			}, function(errMsg) {
				formError(errMsg);
			})
		} else {
			// 验证失败
			formError(validateResult.msg);
		}

	},

	// 登录验证
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

		// 验证通过
		result.status = true;
		result.msg = '验证通过';
		return result;

	}


}


$(function() {




	

	UserLogin.init();

});





