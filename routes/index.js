import Router from 'koa-router'
import view from './view'
import api from './api'

const router = new Router({
    prefix: '/v1'
})


router.get('/login', function* (next) {
    yield this.render('../views/main.pug',{
        user_info: '{}'
    })
})


router.use(view.routes())
router.use('/api', api.routes())

export default router