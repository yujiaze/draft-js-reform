import co from 'co'
import logger from '../logger'
import BaseError from '../error'

export default function* (next) {
    let timeout
    yield Promise.race([
        new Promise((resolve, reject) => {
            co(function* () {
                yield next
            }).then(() => {
                clearTimeout(timeout)
                resolve()
            }, e => reject(e))
        }),
        new Promise((resolve, reject) => {
            timeout = setTimeout(() => {
                var err = new BaseError('Request Timeout', 408)
                reject(err)
            }, 10000)
        }),
    ])
}