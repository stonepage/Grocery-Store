/*
* @Author: GARNET
* @Date:   2018-04-11 15:14:37
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-12 15:48:42
*/



var gs = require('../../../utils/gs');
// var user = require('../../../service/user');
// var cart = require('../../../service/cart');


// 通用页面头部搜索
const Header = {

	init: function() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad: function() {
		var json = gs.getUrlParam(window.location.href),
			keyword = json.keyword;
		console.log(keyword);
		if (keyword) {
			$('#searchInput').val(keyword);
		}
	},

	// 点击搜索
	bindEvent: function() {
		var _t = this;
		$('#searchBtn').on('click', function(e) {
			_t.searchSubmit();
		});

		// 键盘按钮绑定
		$('#searchInput').on('keyup', function(e) {
			if (e.keyCode === 13) {
				_t.searchSubmit();
			}
			return false;
		});


	},

	// 提交搜索
	searchSubmit: function() {
		var keyword = $.trim($('#searchInput').val());
		// 有有效keyword时，正常跳到list页
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		} else {
			return false;
			
			// 无效keyword时，跳回首页
			// gs.gotoIndex();
		}
	}



}


Header.init();

// export default header;
// module.exports = header;
