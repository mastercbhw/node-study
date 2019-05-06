const Koa = require('koa');
const router =require('koa-router')();
const app = new Koa()

router.get('/', async ctx => {
  await ctx.cookies.set('name', '21341', {
    maxAge: 5000
  })
  ctx.body = "ssdads"
})

app.use(router.routes())


app.listen(3000)
console.log('start 3000');