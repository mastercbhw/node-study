const Koa = require('koa');
const router = require('koa-router')();
const bodyParse = require('koa-bodyparser')
const static = require('koa-static');
const staticPatch = './static'

const app = new Koa()

app.use(bodyParse())

// 应用级中间件，所有的路由都会调用
app.use(async (ctx, next) => {
  console.log('应用级中间件，所有请求都会调用我')
  await next()
})

// 错误处理中间件
app.use(async (ctx, next) => {
  next()
 if(ctx.status === 404) {
   ctx.status = 404;
   ctx.body = "这是一个404页面"
 }
})

// 路由中间件，next后会继续向下匹配。
router.get('/', async (ctx, next) => {
  console.log('我是路由级别的中间件')
  await next()
})

router.get('/', (ctx, next) => {
  ctx.body = "这是首页"
})

router.get('/news', (ctx, next) => {
  ctx.body = "这是新闻列表"
})

app.use(router.routes())  // 作用：启动路由
app.use(router.allowedMethods())  // 作用： 这是官方文档推荐写法，我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后，所以在当所有路由中间件最后调用，此时根据ctx.status设置response响应头


app.use(static(
  path.join(__dirname, staticPatch)
))


app.listen(3000, () => {
  console.log('start at port 3000');
})