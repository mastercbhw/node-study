const User = require('../models/User')
const md5 = require('md5-node')

// 渲染登录页面 login.ejs
exports.showLogin = (req, res) => {
	res.render('login')
}


// 登录
exports.doLogin = (req, res) => {
	const { name, password } = req.body
	User.findUser({ name, password: md5(password) },(err, result) => {
		if(!err) {
			if (result) {
				// 登录后session保存用户信息
				req.session.userInfo = result
				// 登陆成功, 跳转到商品列表
				res.redirect('/product')
			} else { // 未查到数据
				console.log("出错了", err);
				res.send('登录失败')
			}
		} else {
			res.json({message: '登录失败'})
			console.log("出错了", err);
		}
	})
}

// 退出登录
exports.doLogout = (req, res) => {
	req.session.destroy((err) => {
		if(err) {
			console.log('err', err)
		} else {
			res.redirect('/login')
		}
	})
}

