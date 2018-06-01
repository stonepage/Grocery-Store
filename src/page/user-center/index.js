/*
* @Author: GARNET
* @Date:   2018-05-21 11:00:27
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-28 15:37:19
*/

require('../common/index');
require('../../assets/css/mixin.less');

import gs from '../../utils/gs';
import formValidate from '../../utils/formValidate';
import _user from '../../service/user';
import asideMenu from '../common/aside/index';
import breadTpl from '../common/tpl/bread.tpl';
import userInfoTpl from './userInfo.tpl';


// 用户中心
const UserCenter = {

	init: function() {
		this.onLoad();
		this.dataOrigin = {};
	},

	onLoad: function() {
		let dom = gs.renderTpl(breadTpl, {
			curPos: '个人中心'
		});
		$('.bread-list').append(dom);
		asideMenu.init({
			name: 'userCenter',
			href: 'javascript:;'
		})
		this.loadUserInfo();
	},


	loadUserInfo: function() {
		let _t = this;
		let userInfoDom = '', rst = {};
		_user.getUserInfo(function(res) {
			rst = {
				username: res.username,
				phone: res.phone,
				email: res.email,
				question: res.question,
				answer: res.answer,
				editing: false
			}
			_t.dataOrigin = rst;
			userInfoDom = gs.renderTpl(userInfoTpl, rst);
			$('.user-center-info').empty().append(userInfoDom);

			// 重新绑定事件
			_t.bindEvent(rst);

		}, function(errMsg) {
			gs.errorTips(errMsg);
		})
	},


	bindEvent: function(rst) {
		let _t = this;
		let userInfoDom = '', dataSend = {};
		let btnEdit = $('#userInfoEdit');
		btnEdit.on('click', function(e) {
			e.preventDefault();
			rst.editing = true;
			userInfoDom = gs.renderTpl(userInfoTpl, rst);
			$('.user-center-info').empty().append(userInfoDom);
			_t.saveUserInfo();
			_t.cancelUserInfo();
		});
	},

	// 保存用户信息编辑
	saveUserInfo: function() {
		let _t = this;
		let phone = $('#phone'),
			email = $('#email'),
			question = $('#question'),
			answer = $('#answer');
		let btnSave = $('#userInfoSave');

		btnSave.on('click', function(e) {
			e.preventDefault();
			let dataStore = {
				phone: $.trim(phone.val()),
				email: $.trim(email.val()),
				question: $.trim(question.val()),
				answer: $.trim(answer.val())
			}

			let validateResult = formValidate(dataStore, {
				phone: true,
				email: true,
				question: true,
				answer: true
			});

			// 验证通过
			if (validateResult.status) {

				_user.updateUserInfo(dataStore, function(res, msg) {
					// 更新用户信息成功
					console.log(validateResult.msg);
					// gs.successTips(validateResult.msg);

					let userInfoDom = gs.renderTpl(userInfoTpl, dataStore);
					$('.user-center-info').empty().append(userInfoDom);

					// 编辑保存之后重新渲染
					_t.loadUserInfo();

				}, function(errMsg) {
					// 更新用户信息失败
					gs.errorTips(errMsg);
				})
			// 验证失败
			} else {
				gs.errorTips(validateResult.msg);
			}
		})


	},

	// 取消用户信息编辑
	cancelUserInfo: function() {

		let _t = this;
		let btnCancel = $('#userInfoCancel');
		btnCancel.on('click', function(e) {
			e.preventDefault();
			_t.loadOriginalData();
		});
	},

	loadOriginalData: function() {

		this.dataOrigin.editing = false;
		let userInfoDom = gs.renderTpl(userInfoTpl, this.dataOrigin);
		$('.user-center-info').empty().append(userInfoDom);
		// 重新绑定事件
		this.bindEvent(this.dataOrigin);
	}

}



// $(function() {
	UserCenter.init();
	
// });








