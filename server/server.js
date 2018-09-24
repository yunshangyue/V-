const Koa = require('koa')
const send = require('koa-send')
const path = require('path')

const app = new Koa()

// const pageRouter = require('./routers/dev-ssr')

const staticRouter = require('./routers/static')

const isDev = process.env.NODE_ENV == 'development'

app.use(async (ctx, next) => {
    try {
        console.log(`request with path ${ctx.path}`)
        await next()
    } catch (e) {
        console.log(e)
        ctx.status = 500
        if (isDev) {
            ctx.body = e.message
        } else {
            ctx.body = 'd'
        }
    }
})

app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
        await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
    } else {
        await next()
    }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
    pageRouter =require('./routers/dev-ssr')
} else {
    pageRouter= require('./routers/ssr')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const POST = process.env.POST || 3333

app.listen(POST, HOST, () => {
    console.log('server run on 3333')
})

