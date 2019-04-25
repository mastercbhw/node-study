const express = require("express")
const bodyParser = require('body-parser')
const session = require('express-session')

// 连接数据库
require('./config/mongoose')

// ctrl
const UserCtrl = require('./controllers/User')
const ProductCtrl = require('./controllers/Product')

const app = express()

app.set("view engine", "ejs")

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// session 中间件保存用户信息
app.use(session({
	secret: 'my key string',
	resave: false,
	saveUninitialized: true,  // 强制存储未初始化session
	cookie: {
		maxAge: 1000 * 60 * 60,
	},
	rolling: true,  // 从最后一次操作开始cookie过期计时
}))



//自定义中间件，判断登录状态
app.use((req, res, next) => {
	const { url } = req
	if (url !== '/login') {
		const sessionUserInfo = req.session.userInfo
		if(sessionUserInfo && sessionUserInfo!=='') {
			// ejs 设置全局变量，所有页面都可以访问
			app.locals['userInfo'] = req.session.userInfo
			next()
		} else {
			res.redirect('/login')
		}
	} else {
		next()
	}
})




app.get('/login', UserCtrl.showLogin)
app.post('/login', UserCtrl.doLogin)
app.get('/logout', UserCtrl.doLogout)
app.get('/product', ProductCtrl.showProduct)
app.get('/productadd', ProductCtrl.showAddProduct)
app.post('/productadd', ProductCtrl.productAdd)
app.get('/productedit', ProductCtrl.showProductEdit)
app.post('/productedit', ProductCtrl.ProductEdit)
app.get('/deleteProduct', ProductCtrl.deleteProduct)



app.use(express.static('public'))

app.use('/upload', express.static('upload'))

app.listen(3000)
console.log('项目运行在3000端口')
