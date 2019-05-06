const Koa = require('koa')

const static = require('koa-static')

const app = new Koa()

app.use(static(__dirname + '/public'))

app.listen(3000)
console.log('start 3000');