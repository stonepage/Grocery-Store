/*
* @Author: GARNET
* @Date:   2018-05-25 15:11:32
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-29 11:18:00
*/


require('../common/index');
require('../../assets/css/mixin.less');

import gs from '../../utils/gs';
import formValidate from '../../utils/formValidate';
import _user from '../../service/user';
import asideMenu from '../common/aside/index';
// import breadTpl from '../common/tpl/bread.tpl';
// import userInfoTpl from './userInfo.tpl';


// 修改密码
const PasswordUpdate = {

	init: function() {
		this.$btnSubmit = $('#submitNewPassword');
		this.onLoad();
	},

	onLoad: function() {
		asideMenu.init({
			name: 'passwordUpdate',
			href: 'javascript:;'
		})
		this.bindEvent();
	},

	bindEvent: function() {
		this.$btnSubmit.on('click', function(e) {
			e.preventDefault();
			let dataPassword = {
				password: $.trim($('#oldPassword').val()),
				passwordNew: $.trim($('#newPassword').val()),
				passwordConfirm: $.trim($('#newPasswordConfirm').val())
			}

			let validateResult = formValidate(dataPassword, {
				passwordOriginal: true,
				passwordNew: true,
				passwordConfirm: true,
				passwordLength: true
			});

			// 验证通过
			if (validateResult.status) {
				// 更改用户密码
				_user.updatePassword({
					passwordOld: dataPassword.password,
					passwordNew: dataPassword.passwordNew
				}, function(res, msg) {
					gs.successTips(msg);
					$('#oldPassword').val('')
					$('#newPassword').val('')
					$('#newPasswordConfirm').val('')
				}, function(errMsg) {
					gs.errorTips(errMsg);
				});

			// 验证失败
			} else {
				gs.errorTips(validateResult.msg);
			}
		})
	}
}





// $(function() {
	PasswordUpdate.init();
	
// });








