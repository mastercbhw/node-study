const express = require('express')
const UserCtrl = require('../controllers/User')
const userRouter = express.Router()


userRouter.get('/', UserCtrl.showLogin)
userRouter.post('/', UserCtrl.doLogin)
userRouter.get('/logout', UserCtrl.doLogout)

module.exports = userRouter