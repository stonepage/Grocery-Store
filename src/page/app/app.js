/*
* @Author: GARNET
* @Date:   2018-03-27 17:03:04
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-11 16:36:11
*/

var gs = require('../../utils/gs');
require('../common/index');

var styles = require('./app.less');
require('../../assets/css/mixin.css');

function Login() {
	var r = $('<a href="javascript:;" class="el-button el-button--primary el-button--medium" id="do">start</a>')
	$('.app-hs').append(r);

	var data = {
		con: '香椿摊鸡蛋',
	}
	var dom = '<div class=' + styles.con + '><b class=' + styles.b + '>{{con}}</b></div>';

	var p = gs.renderTpl(dom, data);

	// $('.app-hs').append(p)


}

gs.request({
	url: '/product/list.do?keyword=1',
	success: function(res) {
		console.log(res)
	}
});

// $('body').on('click', function(event) {
// 	alert('body');
// });

function init() {
	Login();
	
	var btn = $('#do');
	btn.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		gs.successTips();
	});
}


init();







































// =============================================================
// $('body').append('<div class="v-modal"></div>');

// if (module.hot) {
// 	module.hot.accept('./index.js', function() {
// 		console.log('Accepting the updated Login module!');
// 		Login();
// 	})
// }


