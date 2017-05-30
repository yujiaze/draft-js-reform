const config = {
    base: {
        LOG_LEVEL: 'debug',
    },
    dev: {
        LOG_LEVEL: 'debug',
        proxy_url: '',
        backend_url: '',
    },
    test: {
        LOG_LEVEL: 'info',
        proxy_url: '',
        backend_url: '',        
    },
    production: {
        LOG_LEVEL: 'info'
    }
}


var env = process.env.NODE_ENV || 'dev'

export default Object.assign({}, config['base'], config[env])