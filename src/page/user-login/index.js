/*
* @Author: GARNET
* @Date:   2018-03-27 17:02:25
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-28 15:37:41
*/


import gs from '../../utils/gs';
import formValidate from '../../utils/formValidate';
import _user from '../../service/user';
import '../../assets/css/mixin.less';
import styles from './index.css';
import errMsgTpl from '../common/tpl/errMsg.tpl';



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
		var validateResult = formValidate(formData, {
			username: true,
			password: true
		});
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
	}


}


// $(function() {

UserLogin.init();

// });





