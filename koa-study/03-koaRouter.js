const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

router.get('/', (ctx, next) => {
  ctx.body = "这是首页"
})

router.get('/news', (ctx, next) => {
  ctx.body = "这是新闻列表"
})

router.get('/newscontent', (ctx, next) => {
  let url = ctx.url;
  // 从request中获取get请求
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;

  // 从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
  }

})


// http://localhost:3000/newscontent?id=1&name=li

//得到
/* {
  "url": "/newscontent?id=1&name=li",
  "req_query": {
    "id": "1",
    "name": "li"
  },
  "req_querystring": "id=1&name=li",
  "ctx_query": {
    "id": "1",
    "name": "li"
  },
  "ctx_querystring": "id=1&name=li"
}
 */

 // 请求 http://localhost:3000/product/1
router.get('/product/:id', async (ctx, next) => {
  console.log(ctx.params)   // { id: '1' }
  ctx.body = "这是商品页面"
  next()
})


app.use(router.routes())  // 作用：启动路由
app.use(router.allowedMethods())  // 作用： 这是官方文档推荐写法，我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后，所以在当所有路由中间件最后调用，此时根据ctx.status设置response响应头

app.listen(3000, () => {
  console.log('start at port 3000');
})