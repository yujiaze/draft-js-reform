import Koa from 'koa'
import timeoutMdr from './lib/middlewares/timeout'
import views from 'koa-views'
import path from 'path'
import router from './routes'
import send from 'koa-send'
import bodyParserMiddleware from 'koa-bodyparser'
import proxyMdr from './lib/middlewares/proxy'
import config from './conf/config'

var app = new Koa()

// Must be used before any router is used
app.use(views(path.join(__dirname, '..', '/build'), {
    // map: {
    //     html: 'pug'
    // },
    // extension: 'pug'
}))

app.use(function* (next) {
    try {
        yield next
    } catch (e) {
        this.status = e.status || 500
        this.body = e.message
    }
})

app.use(timeoutMdr)

// global information for middlewares
app.use(function* (next) {
    this.state.config = config
    yield next
})

app.use(bodyParserMiddleware({
    formLimit: '1mb' //prevent payload too large 413
}))

app.use(router.routes())

app.use(function* (next) {
    if (this.path.match(/build/)) {
        yield send(this, this.path, { root: path.join(__dirname, '..') });
    } else {
        yield next
    }
})

app.use(proxyMdr)

var argv = require('optimist').argv

var port = argv.port

app.listen(port || 8888)

