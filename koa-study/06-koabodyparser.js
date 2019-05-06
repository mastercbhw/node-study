const Koa = require('koa');
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  ctx.body = ctx.request.body
})


router.post('/add', async ctx => {
  console.log(ctx.body)
})

app.use(router.routes())

app.listen(3000)