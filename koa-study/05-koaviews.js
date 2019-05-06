const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');

const app = new Koa()

// 引用模版引擎

app.use(views('views', {
    map: {
      html: 'ejs'
    }
  }
))


router.get('/list', async ctx => {
  await ctx.render('index.ejs', {
    list : [
      {name: 'li', id: '1'},
      {name: 'han', id: '2'},
      {name: 'chen', id: '2'},
    ]
  })
})


app.use(router.routes())  // 作用：启动路由
app.use(router.allowedMethods()) 

app.listen(3000)