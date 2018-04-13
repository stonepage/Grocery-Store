/*
* @Author: GARNET
* @Date:   2018-04-09 18:46:21
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-11 19:11:12
*/


var gs = require('../../../utils/gs');
var user = require('../../../service/user');
var cart = require('../../../service/cart');


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
			window.location.href= './register.html';
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
		user.checkLogin(function(res) {
			console.log('加载用户信息');
		}, function(errMsg) {
			// gs.errorTips(errMsg);
		});
	},

	// 加载购物车
	loadCartCount: function() {
		cart.getCartCount(function(res) {
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


