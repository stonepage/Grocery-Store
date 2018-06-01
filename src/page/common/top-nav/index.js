/*
* @Author: GARNET
* @Date:   2018-04-09 18:46:21
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-25 18:17:17
*/


let gs = require('../../../utils/gs');
let _user = require('../../../service/user');
let _cart = require('../../../service/cart');
let topNavLoginTpl =require('./topNavLogin.tpl');

function Nav() {}

Nav.prototype = {

	constructor: Nav,

	init: function() {
		this.initTpl();
		this.loadUserInfo();
		this.loadCartCount();
		
		return this;
	},


	initTpl: function() {
		this.tpl = gs.renderTpl(topNavLoginTpl, {
			signIn: '登录',
			signUp: '注册'
		})
	},

	bindEventBeforeLogin: function() {
		// 登录
		$('.js-login').on('click', function(e) {
			gs.doLogin()
		});

		// 注册
		$('.js-register').on('click', function(e) {
			window.location.href= './user-register.html';
		});	
	},

	bindEventAfterLogin: function() {
		// 登出
		$('.js-logout').on('click', function(e) {
			_user.userLogout(function() {
				window.location.reload();
			}, function() {
				gs.errorTips(errMsg);
			});
		});
	},


	// 加载用户信息
	loadUserInfo: function() {
		let _t = this;
		_user.checkLoginStatus(function(res) {
			// 用户登录后
			console.log(res)
			$('.user.not-login').html('').siblings('.user.login').show().find('.username').text(res.username);
			_t.bindEventAfterLogin();
		}, function(errMsg) {
			// 用户未登录时
			console.log(errMsg)
			$('.user.not-login').html(_t.tpl);
			_t.bindEventBeforeLogin();
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


// export default nav.init();
let nav = new Nav();
module.exports = nav.init();


