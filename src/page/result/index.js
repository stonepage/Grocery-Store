/*
* @Author: GARNET
* @Date:   2018-04-13 15:14:32
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-18 17:11:49
*/




import gs from '../../utils/gs';
import '../../assets/css/mixin.less';
import styles from './index.css';
import registerTpl from './register.tpl';
import defaultTpl from './default.tpl';
import passwordResetTpl from './passwordReset.tpl';

$(function() {
	var url = gs.getUrlParam(window.location.href),
		type = url.type;
	switch (type) {
		case 'register':
			var str = gs.renderTpl(registerTpl, {
				kind: 'register'
			});
		break;
		case 'password-reset':
			var str = gs.renderTpl(passwordResetTpl, {
				kind: 'password-reset'
			});
		break;
		case 'default':
			var str = gs.renderTpl(defaultTpl, {
				kind: 'default'
			});
		break;
	}
	if (str) {
		$('.result-page').html(str);
	}
	
});












