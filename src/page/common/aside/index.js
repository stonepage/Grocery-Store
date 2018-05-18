/*
* @Author: GARNET
* @Date:   2018-04-12 16:11:18
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-18 17:14:06
*/


var gs = require('../../../utils/gs');
var asideTpl = require('./index.tpl');

// 左侧二级菜单
const Aside = {

	option: {
		name: '',
		navList: [
			{
				name: 'userCenter',
				desc: '个人中心',
				href: './user-center.html'
			}, {
				name: 'orderList',
				desc: '我的订单',
				href: './order-list.html'
			}, {
				name: 'passwordModified',
				desc: '修改密码',
				href: './password-reset.html'
			}, {
				name: 'about',
				desc: '关于',
				href: './about.html'
			},
		]
	},

	init: function(option) {
		// 合并选项
		$.extend(this.option, option)
		this.renderAside();
	},

	// 渲染
	renderAside: function() {
		var len = this.option.navList.length;
		for (var i = 0; i < len; i++) {
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			}
		}

		
		var asideHtml = gs.renderTpl(asideTpl, {
			navList: this.option.navList
		})
		$('.el-menu').html(asideHtml);
	}



}

module.exports = Aside;



