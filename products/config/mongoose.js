const mongoose = require('mongoose')
const config = require("./config")

mongoose.connect(config.mongodbUrl, {useNewUrlParser: true});
console.log('连接成功')
