/*
* @Author: GARNET
* @Date:   2018-03-27 17:03:04
* @Last Modified by:   GARNET
* @Last Modified time: 2018-04-10 17:01:13
*/


import gs from '../../utils/gs';
import '../../assets/css/mixin.less';
import '../common/index.css';
import styles from './app.css';




function Login() {
	var r = $('<a href="javascript:;" class="el-button el-button--primary el-button--medium" id="do">start</a>')
	$('body').append(r);
	var r1 = $('<div class=' + styles.pic + '></div>')
	$('body').append(r1);

	var data = {
		con: '香椿',
	}
	var dom = '<div>{{con}}</div>';

	var p = gs.renderTpl(dom, data);

	$('body').append(p)


}

gs.request({
	url: '/product/list.do?keyword=1',
	success: function(res) {
		console.log(res)
	}
});

function init() {
	Login();
	
	var btn = $('#do');
	btn.on('click', function(e) {
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


