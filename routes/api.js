import Router from 'koa-router'

const router = new Router()

router.get('/tag-info', function* (next) {
    if (!this.query["tagid"]) {
        this.status = 400
        return this.body = 'bad request'
    }
    this.body = 'your tagid is ' + this.query["tagid"]
})


router.post('/tag-edit/:tagid', function* (next) {
    this.body = {
        tagid: this.params.tagid
    }
})

export default router
