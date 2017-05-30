import request from 'request'
import config from '../../conf/config'

const auth_verify = (cookie = '') => {
    return new Promise((resolve, reject) => {
        request(
            {
                uri: config.backend_url + '/checkLogin',
                form: {
                    'os_auth': cookie
                },
                method: 'POST'
            },
            (err, response, body) => {
                if (err) return reject(err)
                if (response.statusCode == 200) {
                    resolve({
                        user: body,
                        authed: true
                    })
                } else {
                    resolve({
                        user: {},
                        authed: false
                    })
                }
            }
        )
    })
}

function* auth(next) {
    var data = yield auth_verify(this.cookies.get('auth'))
    if (!data.authed) {
        this.redirect('/v1/login')
    } else {
        this.state.user_info = data.user
        yield next
    }

}

export default auth