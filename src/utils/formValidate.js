/*
* @Author: GARNET
* @Date:   2018-05-24 17:26:55
* @Last Modified by:   GARNET
* @Last Modified time: 2018-05-29 11:40:38
*/

import gs from './gs';



// 表单验证
export default function formValidate(formData, flag) {
	let result = {
		status: false,
		msg: ''
	};

	const VALIDSWITCH = {
		username: false,
		password: false,
		passwordLength: false,
		passwordConfirm: false,
		phone: false,
		email: false,
		question: false,
		answer: false
	}

	if (flag.checkAll) {
		for (let key in VALIDSWITCH) {
			VALIDSWITCH[key] = true;
		}
	}

	if (flag.username || VALIDSWITCH.username) {
		// 验证用户名
		if (!gs.validate(formData.username, 'required')) {
			result.msg = '用户名不能为空';
			return result;
		}
	}

	if (flag.password || VALIDSWITCH.password) {
		// 验证密码
		if (!gs.validate(formData.password, 'required')) {
			result.msg = '密码不能为空';
			return result;
		}
	}

	if (flag.passwordOriginal) {
		// 修改密码时验证密码
		if (!gs.validate(formData.password, 'required')) {
			result.msg = '原密码不能为空';
			return result;
		}
	}

	if (flag.passwordLength || VALIDSWITCH.passwordLength) {
		// 验证密码长度
		if (flag.password || VALIDSWITCH.password) {
			if (formData.password.length < 6) {
				result.msg = '密码长度不能少于6位';
				return result;
			}			
		} else if (flag.passwordNew) {
			if (formData.passwordNew.length < 6) {
				result.msg = '新密码长度不能少于6位';
				return result;
			}		
		}
	}

	if (flag.passwordConfirm || VALIDSWITCH.passwordConfirm) {
		// 验证两次密码是否一致
		if (flag.password || VALIDSWITCH.password) {
			if (formData.password !== formData.passwordConfirm) {
				result.msg = '两次输入的密码不一致';
				return result;
			}
		} else if (flag.passwordNew) {
			if (formData.passwordNew !== formData.passwordConfirm) {
				result.msg = '两次输入的密码不一致';
				return result;
			}
		}
	}



	if (flag.phone || VALIDSWITCH.phone) {
		// 验证手机号
		if (!gs.validate(formData.phone, 'required')) {
			result.msg = '手机号格式不正确';
			return result;
		}
	}

	if (flag.email || VALIDSWITCH.email) {
		// 验证邮箱
		if (!gs.validate(formData.email, 'required')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
	}

	if (flag.question || VALIDSWITCH.question) {
		// 验证密码提示问题
		if (!gs.validate(formData.question, 'required')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
	}

	if (flag.answer || VALIDSWITCH.answer) {
		// 验证密码提示问题答案
		if (!gs.validate(formData.answer, 'required')) {
			result.msg = '密码提示问题答案不能为空';
			return result;
		}
	}

	// 验证通过
	result.status = true;
	result.msg = '验证通过';
	return result;

}