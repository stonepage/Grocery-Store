/*
* @Author: GARNET
* @Date:   2018-04-09 18:46:21
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-11 16:37:54
*/


var gs = require('../../../utils/gs');

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
			console.log(123)
		})
	},

	loadUserInfo: function(e) {
		console.log(123)
	},

	loadCartCount: function(e) {
		console.log(123)
	}

}
















// You can mix require and export. 
// You can‘t mix import and module.exports.


// export default Nav.init();
module.exports = Nav.init();


