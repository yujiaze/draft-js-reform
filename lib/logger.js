import * as winston from 'winston'
import settings from '../conf/config'

let logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)()
    ]
})

logger.level = settings.LOG_LEVEL

export default logger