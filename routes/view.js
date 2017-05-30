import Router from 'koa-router'

const router = new Router()

import authMdr from '../lib/middlewares/auth'

// router.use(authMdr)

router.get('*', function* (next) {
    yield this.render('../views/main.pug', {
        user_info: JSON.stringify(this.state.user_info)
    })
})

export default router
