/*
* @Author: GARNET
* @Date:   2018-04-09 18:46:21
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-17 16:54:51
*/


var gs = require('../../../utils/gs');
var _user = require('../../../service/user');
var _cart = require('../../../service/cart');


const Nav = {

	init: function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},

	bindEvent: function() {
		// 登录
		$('.js-login').on('click', function(e) {
			gs.doLogin()
		});

		// 注册
		$('.js-register').on('click', function(e) {
			window.location.href= './user-register.html';
		});	

		// 登出
		$('.js-logout').on('click', function(e) {
			user.logout(function() {
				window.location.reload();
			}, function() {
				gs.errorTips(errMsg);
			});
		});			

	},


	// 加载用户信息
	loadUserInfo: function() {
		_user.checkLoginStatus(function(res) {
			console.log('加载用户信息');
		}, function(errMsg) {
			console.log('123')
			// gs.errorTips(errMsg);
		});
	},

	// 加载购物车
	loadCartCount: function() {
		_cart.getCartCount(function(res) {
			$('.cart-list .cart-count').text(res || 0);
		}, function(errMsg) {
			$('.cart-list .cart-count').text(0);
		});



	}

}
















// You can mix require and export. 
// You can‘t mix import and module.exports.


// export default Nav.init();
module.exports = Nav.init();


