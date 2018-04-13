/*
* @Author: GARNET
* @Date:   2018-04-11 19:09:48
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-11 19:12:50
*/


var gs = require('../utils/gs');

const Cart = {

	// 获取购物车数量
	getCartCount: function(resolve, reject) {
		gs.request({
			url: gs.getServerUrl('/cart/get_cart_product_count.do'),
			// method: 'post',
			success: resolve,
			error: reject
		})
	},






}










module.exports = Cart;



